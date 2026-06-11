import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import DashboardLayout from '../../components/layout/DashboardLayout';
import NeedCard from '../../components/orphanage/NeedCard';
import { StatCard, PageSpinner, EmptyState } from '../../components/ui/index';

export default function DonorDashboard() {
  const { user } = useAuth();
  const { data: activityData, loading } = useFetch('/donor/activity');

  const stats   = activityData?.stats   || {};
  const feed    = activityData?.feed    || [];
  const recent  = activityData?.recent_interests || [];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="page-header">
        <span className="section-label">Donor Dashboard</span>
        <h1 className="font-display text-2xl font-bold text-ink mt-1">
          Good day, {user?.name?.split(' ')[0]} 👋
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🔖" label="Bookmarked Orphanages" value={stats.total_bookmarks ?? 0} color="green" />
        <StatCard icon="❤️" label="Needs I've Responded To" value={stats.total_interests ?? 0} color="red" />
        <StatCard icon="💬" label="Messages Sent" value={stats.total_messages ?? 0} color="earth" />
        <StatCard icon="🏛️" label="Orphanages Browsed" value={stats.orphanages_browsed ?? 0} color="gold" />
      </div>

      {/* Quick actions */}
      <div className="card p-5 mb-8">
        <h2 className="font-semibold text-ink mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/orphanages" className="btn-primary gap-2">🏛️ Browse Orphanages</Link>
          <Link to="/donor/bookmarks" className="btn-secondary gap-2">🔖 My Bookmarks</Link>
          <Link to="/messages" className="btn-secondary gap-2">💬 Messages</Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent needs from bookmarked orphanages */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-ink">Recent needs from saved orphanages</h2>
            <Link to="/orphanages" className="text-xs text-forest hover:underline flex items-center gap-1">
              Browse all <ArrowRight size={11} />
            </Link>
          </div>
          {loading ? <PageSpinner /> : feed.length === 0 ? (
            <EmptyState icon="🔖" title="No saved orphanages yet" description="Bookmark orphanages to see their needs here."
              action={<Link to="/orphanages" className="btn-primary">Browse Orphanages</Link>} />
          ) : (
            <div className="space-y-4">
              {feed.slice(0, 4).map(n => (
                <motion.div key={n.need_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="card p-4">
                    <p className="text-xs text-ink-muted mb-2">
                      From <Link to={`/orphanages/${n.orphanage_id}`} className="text-forest font-medium hover:underline">{n.org_name}</Link>
                    </p>
                    <NeedCard need={n} compact />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* My recent interests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-ink">My recent interests</h2>
            <Link to="/donor/activity" className="text-xs text-forest hover:underline flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <EmptyState icon="❤️" title="No interests yet" description="Click 'I want to help' on any need to get started." />
          ) : (
            <div className="space-y-3">
              {recent.slice(0, 5).map(i => (
                <div key={i.interest_id} className="card p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{i.title}</p>
                    <p className="text-xs text-ink-muted">{i.org_name}</p>
                  </div>
                  <Link to={`/orphanages/${i.orphanage_id}`} className="btn-secondary btn-sm shrink-0">View →</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
