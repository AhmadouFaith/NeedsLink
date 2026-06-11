import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PageSpinner, EmptyState, Spinner } from '../../components/ui/index';
import { timeAgo } from '../../utils/helpers';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function MessagesPage() {
  const { user }              = useAuth();
  const [params]              = useSearchParams();
  const initTo                = params.get('to');

  const [activeThread, setActiveThread]   = useState(initTo ? parseInt(initTo) : null);
  const [messages,     setMessages]       = useState([]);
  const [threadUser,   setThreadUser]     = useState(null);
  const [content,      setContent]        = useState('');
  const [sending,      setSending]        = useState(false);
  const [loadingThread, setLoadingThread] = useState(false);
  const bottomRef = useRef(null);

  const { data: convData, loading: convLoading, refetch: refetchConvs } = useFetch('/messages/conversations');
  const conversations = convData?.conversations || [];

  // Load thread when activeThread changes
  useEffect(() => {
    if (!activeThread) return;
    setLoadingThread(true);
    api.get(`/messages/${activeThread}`)
      .then(({ data }) => {
        setMessages(data.messages || []);
        setThreadUser(data.other_user || null);
      })
      .catch(() => toast.error('Failed to load messages.'))
      .finally(() => setLoadingThread(false));
  }, [activeThread]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim() || !activeThread) return;
    setSending(true);
    try {
      const { data } = await api.post('/messages', { receiver_id: activeThread, content: content.trim() });
      setMessages(prev => [...prev, data.message]);
      setContent('');
      refetchConvs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message.');
    } finally { setSending(false); }
  };

  const isMine = (msg) => msg.sender_id === user?.user_id;

  return (
    <DashboardLayout>
      <div className="page-header">
        <span className="section-label">Shared</span>
        <h1 className="font-display text-2xl font-bold text-ink mt-1">Messages</h1>
      </div>

      <div className="card overflow-hidden" style={{ height: 'calc(100vh - 260px)', minHeight: '500px' }}>
        <div className="flex h-full">

          {/* Conversation list */}
          <div className="w-full md:w-72 border-r border-forest/10 flex flex-col shrink-0">
            <div className="px-4 py-3 border-b border-forest/10 bg-ivory">
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Conversations</p>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {convLoading ? <div className="p-4"><PageSpinner /></div> :
               conversations.length === 0 ? (
                <div className="p-6 text-center">
                  <MessageSquare size={32} className="text-ink-light mx-auto mb-2" />
                  <p className="text-xs text-ink-muted">No conversations yet</p>
                </div>
              ) : (
                conversations.map(conv => {
                  const otherId   = conv.user_a_id === user?.user_id ? conv.user_b_id : conv.user_a_id;
                  const otherName = conv.user_a_id === user?.user_id ? conv.user_b_name : conv.user_a_name;
                  const isActive  = activeThread === otherId;
                  return (
                    <button
                      key={`${conv.user_a_id}-${conv.user_b_id}`}
                      onClick={() => setActiveThread(otherId)}
                      className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-forest/8 text-left transition-colors
                        ${isActive ? 'bg-forest/10' : 'hover:bg-forest/5'}`}
                    >
                      <div className="w-9 h-9 rounded-full bg-forest/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-forest">{otherName?.[0]?.toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm font-medium truncate ${isActive ? 'text-forest' : 'text-ink'}`}>{otherName}</p>
                          <span className="text-[10px] text-ink-light whitespace-nowrap">{timeAgo(conv.last_message_at)}</span>
                        </div>
                        <p className="text-xs text-ink-muted truncate mt-0.5">{conv.last_message_preview || '…'}</p>
                      </div>
                      {conv.unread_count > 0 && (
                        <span className="w-4 h-4 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {conv.unread_count}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Thread view */}
          <div className="hidden md:flex flex-col flex-1 min-w-0">
            {!activeThread ? (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState icon={<MessageSquare size={40} className="text-ink-light" />} title="Select a conversation" description="Choose a conversation from the left to read and reply." />
              </div>
            ) : (
              <>
                {/* Thread header */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-forest/10 bg-white shrink-0">
                  {threadUser ? (
                    <>
                      <div className="w-9 h-9 rounded-full bg-forest/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-forest">{threadUser.name?.[0]?.toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-ink">{threadUser.name}</p>
                        <p className="text-xs text-ink-muted capitalize">{threadUser.role}</p>
                      </div>
                    </>
                  ) : <div className="h-6 w-32 bg-ink/8 animate-pulse rounded-lg" />}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-hide bg-ivory/50">
                  {loadingThread ? <PageSpinner /> : messages.length === 0 ? (
                    <div className="text-center py-8 text-sm text-ink-muted">No messages yet. Say hello!</div>
                  ) : (
                    <>
                      {messages.map((msg, i) => (
                        <motion.div
                          key={msg.message_id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className={`flex ${isMine(msg) ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                            ${isMine(msg)
                              ? 'bg-forest text-white rounded-br-sm'
                              : 'bg-white border border-forest/10 text-ink rounded-bl-sm shadow-sm'
                            }`}
                          >
                            <p>{msg.content}</p>
                            <p className={`text-[10px] mt-1 ${isMine(msg) ? 'text-white/60' : 'text-ink-light'} text-right`}>
                              {timeAgo(msg.sent_at)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={bottomRef} />
                    </>
                  )}
                </div>

                {/* Composer */}
                <form onSubmit={handleSend} className="flex items-end gap-3 px-4 py-3.5 border-t border-forest/10 bg-white shrink-0">
                  <textarea
                    rows={1}
                    className="input-field resize-none flex-1 py-2.5 text-sm"
                    placeholder="Write a message…"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); }
                    }}
                    style={{ minHeight: 42, maxHeight: 120 }}
                  />
                  <button
                    type="submit"
                    disabled={!content.trim() || sending}
                    className="btn-primary p-2.5 rounded-xl disabled:opacity-50 shrink-0"
                  >
                    {sending ? <Spinner size={16} className="text-white" /> : <Send size={16} />}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
