import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle, Bookmark, MessageSquare, ArrowLeft } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { useMutation } from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import NeedCard from '../../components/orphanage/NeedCard';
import { PageSpinner, EmptyState } from '../../components/ui/index';
import { imgUrl, formatDate, timeAgo } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function OrphanageProfilePublic() {
  const { id }  = useParams();
  const { isAuth, user } = useAuth();
  const [tab, setTab] = useState('needs');
  const [interests, setInterests] = useState(new Set());
  const [bookmarked, setBookmarked] = useState(false);

  const { data, loading } = useFetch(`/orphanages/${id}`);
  const { mutate: doInterest }  = useMutation('post');
  const { mutate: doBookmark }  = useMutation('post');
  const { mutate: unBookmark }  = useMutation('delete');

  if (loading) return (<><Navbar /><PageSpinner /></>);
  if (!data)   return (<><Navbar /><div className="page-container py-20 text-center text-ink-muted">Orphanage not found.</div></>);

  const { orphanage, needs, updates } = data;

  const handleInterest = async (need_id) => {
    if (!isAuth) { toast.error('Please log in to express interest.'); return; }
    if (user?.role !== 'donor') { toast.error('Only donors can express interest.'); return; }
    try {
      await doInterest('/interests', { need_id });
      setInterests(prev => new Set(prev).add(need_id));
      toast.success('Your interest has been sent to the orphanage!');
    } catch { toast.error('You have already expressed interest in this need.'); }
  };

  const handleBookmark = async () => {
    if (!isAuth) { toast.error('Please log in to bookmark.'); return; }
    if (bookmarked) {
      await unBookmark(`/bookmarks/${id}`);
      setBookmarked(false);
      toast.success('Bookmark removed.');
    } else {
      await doBookmark('/bookmarks', { orphanage_id: id });
      setBookmarked(true);
      toast.success('Orphanage bookmarked!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      {/* Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-forest/30 to-forest/60 overflow-hidden">
        {orphanage.banner_image_url && (
          <img src={imgUrl(orphanage.banner_image_url)} alt="" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-4 left-4">
          <Link to="/orphanages" className="inline-flex items-center gap-1.5 text-white/90 text-sm hover:text-white">
            <ArrowLeft size={14} /> Back to browse
          </Link>
        </div>
      </div>

      <div className="page-container">
        {/* Profile header */}
        <div className="relative -mt-14 mb-8">
          <div className="card p-6">
            <div className="flex flex-col md:flex-row gap-5 items-start">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-card bg-forest/10 flex items-center justify-center shrink-0 overflow-hidden -mt-16 md:mt-0">
                {orphanage.profile_image_url
                  ? <img src={imgUrl(orphanage.profile_image_url)} alt={orphanage.org_name} className="w-full h-full object-cover" />
                  : <span className="text-4xl">🏛️</span>
                }
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="font-display text-2xl font-bold text-ink">{orphanage.org_name}</h1>
                  {orphanage.verified === 1 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-forest text-white">
                      <CheckCircle size={11} className="fill-white" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-ink-muted mb-3">
                  <span className="flex items-center gap-1"><MapPin size={13} />{orphanage.location}</span>
                  {orphanage.phone && <span className="flex items-center gap-1"><Phone size={13} />{orphanage.phone}</span>}
                  <span className="flex items-center gap-1"><Mail size={13} />{orphanage.email}</span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">{orphanage.description}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleBookmark}
                  className={`btn-secondary gap-2 ${bookmarked ? 'bg-forest/10 border-forest text-forest' : ''}`}
                >
                  <Bookmark size={15} className={bookmarked ? 'fill-forest' : ''} />
                  {bookmarked ? 'Saved' : 'Save'}
                </motion.button>
                {isAuth && user?.role === 'donor' && (
                  <Link to={`/messages?to=${orphanage.user_id}`} className="btn-primary gap-2">
                    <MessageSquare size={15} /> Message
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-forest/10 mb-8">
          {[['needs', `Needs (${needs?.length || 0})`], ['updates', `Updates (${updates?.length || 0})`]].map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === t ? 'border-forest text-forest' : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="pb-12">
          {tab === 'needs' && (
            needs?.length === 0
              ? <EmptyState icon="📋" title="No active needs" description="This orphanage hasn't posted any needs yet." />
              : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {needs.map(n => (
                    <NeedCard
                      key={n.need_id}
                      need={n}
                      onInterest={handleInterest}
                      isInterested={interests.has(n.need_id)}
                    />
                  ))}
                </div>
          )}

          {tab === 'updates' && (
            updates?.length === 0
              ? <EmptyState icon="📢" title="No updates yet" description="This orphanage hasn't posted donation updates." />
              : <div className="space-y-4 max-w-2xl">
                  {updates.map(u => (
                    <motion.div
                      key={u.update_id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className="card p-5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-ink">{u.title}</h4>
                        <span className="text-xs text-ink-light shrink-0 ml-3">{timeAgo(u.created_at)}</span>
                      </div>
                      <p className="text-sm text-ink-muted leading-relaxed">{u.description}</p>
                      {u.image_url && (
                        <img src={imgUrl(u.image_url)} alt={u.title} className="mt-4 rounded-xl w-full h-40 object-cover" />
                      )}
                    </motion.div>
                  ))}
                </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
