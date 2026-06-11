import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useFetch, useMutation } from '../../hooks/useFetch';
import DashboardLayout from '../../components/layout/DashboardLayout';
import OrphanageCard from '../../components/orphanage/OrphanageCard';
import NeedCard from '../../components/orphanage/NeedCard';
import { PageSpinner, EmptyState } from '../../components/ui/index';
import { timeAgo } from '../../utils/helpers';
import toast from 'react-hot-toast';

/* Bookmarks */
export function BookmarksPage() {
  const { data, loading, refetch } = useFetch('/donor/bookmarks');
  const { mutate: remove } = useMutation('delete');
  const bookmarks = data?.bookmarks || [];

  const handleRemove = async (orphanage_id) => {
    try {
      await remove(`/bookmarks/${orphanage_id}`);
      toast.success('Bookmark removed.');
      refetch();
    } catch { toast.error('Failed to remove bookmark.'); }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <span className="section-label">Donor</span>
        <h1 className="font-display text-2xl font-bold text-ink mt-1">
          My Bookmarks
          {bookmarks.length > 0 && <span className="ml-3 badge-green">{bookmarks.length}</span>}
        </h1>
      </div>

      {loading ? <PageSpinner /> : bookmarks.length === 0 ? (
        <EmptyState
          icon="🔖"
          title="No bookmarks yet"
          description="Save orphanages you care about and their latest needs will appear here."
          action={<Link to="e" className="btn-primary">Browse Orphanages</Link>}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((b, i) => (
            <motion.div key={b.orphanage_id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="relative">
              <OrphanageCard orphanage={b} onBookmark={handleRemove} bookmarked />
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

/* Activity*/
export function ActivityPage() {
  const { data, loading } = useFetch('/donor/activity');
  const interests = data?.recent_interests || [];

  return (
    <DashboardLayout>
      <div className="page-header">
        <span className="section-label">Donor</span>
        <h1 className="font-display text-2xl font-bold text-ink mt-1">My Activity</h1>
      </div>

      {loading ? <PageSpinner /> : interests.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="No activity yet"
          description="When you click 'I want to help' on a need, it will appear here."
          action={<Link to="/orphanages" className="btn-primary">Browse Needs</Link>}
        />
      ) : (
        <div className="max-w-2xl space-y-4">
          <p className="text-sm text-ink-muted mb-2">{interests.length} needs you've responded to</p>
          {interests.map((item, i) => (
            <motion.div
              key={item.interest_id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Link to={`/orphanages/${item.orphanage_id}`} className="text-xs font-semibold text-forest hover:underline">
                    {item.org_name}
                  </Link>
                  <p className="text-xs text-ink-light">{timeAgo(item.created_at)}</p>
                </div>
                <span className="badge-green text-xs">Interested</span>
              </div>
              <NeedCard need={item} compact />
              {item.note && (
                <div className="mt-3 px-4 py-3 rounded-xl bg-forest/6 border-l-2 border-forest/30">
                  <p className="text-xs text-ink-muted italic">Your note: "{item.note}"</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
