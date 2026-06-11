import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import { useMutation } from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';
import OrphanageCard from '../../components/orphanage/OrphanageCard';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { PageSpinner, EmptyState, Pagination } from '../../components/ui/index';
import { NEED_CATEGORIES } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function BrowseOrphanages() {
  const { isAuth } = useAuth();
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [page,     setPage]     = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarked, setBookmarked]   = useState(new Set());

  const query = new URLSearchParams({ page, limit: 12, verified: true });
  if (search)   query.set('search', search);
  if (category) query.set('category', category);

  const { data, loading } = useFetch(`/orphanages?${query}`);
  const { mutate: doBookmark } = useMutation('post');
  const { mutate: unBookmark } = useMutation('delete');

  const orphanages = data?.orphanages || [];
  const pagination = data?.pagination;

  const handleBookmark = useCallback(async (id) => {
    if (!isAuth) { toast.error('Log in to bookmark orphanages.'); return; }
    if (bookmarked.has(id)) {
      await unBookmark(`/bookmarks/${id}`);
      setBookmarked(prev => { const s = new Set(prev); s.delete(id); return s; });
      toast.success('Bookmark removed.');
    } else {
      await doBookmark('/bookmarks', { orphanage_id: id });
      setBookmarked(prev => new Set(prev).add(id));
      toast.success('Orphanage bookmarked!');
    }
  }, [isAuth, bookmarked]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-forest/10">
        <div className="page-container py-8">
          <span className="section-label">Browse</span>
          <h1 className="font-display text-3xl font-bold text-ink mt-1 mb-6">Orphanages in Cameroon</h1>

          {/* Search bar */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by name or location…"
                className="input-field pl-10"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X size={15} className="text-ink-muted" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`btn-secondary gap-2 ${showFilters ? 'bg-forest/10 border-forest text-forest' : ''}`}
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>

          {/* Filter bar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              <span className="text-xs font-semibold text-ink-muted self-center">Needs category:</span>
              {NEED_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setCategory(category === cat ? '' : cat); setPage(1); }}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors capitalize
                    ${category === cat ? 'bg-forest text-white border-forest' : 'bg-white text-ink-muted border-forest/20 hover:border-forest/50'}`}
                >
                  {cat}
                </button>
              ))}
              {(category) && (
                <button onClick={() => setCategory('')} className="px-3 py-1 rounded-full text-xs font-medium text-ember border border-ember/30 hover:bg-ember/8">
                  Clear
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="page-container py-8 flex-1">
        {loading ? (
          <PageSpinner />
        ) : orphanages.length === 0 ? (
          <EmptyState
            icon="🏛️"
            title="No orphanages found"
            description="Try adjusting your search or filters."
            action={<button onClick={() => { setSearch(''); setCategory(''); }} className="btn-secondary">Clear filters</button>}
          />
        ) : (
          <>
            <p className="text-sm text-ink-muted mb-6">
              Showing {orphanages.length} of {pagination?.total || 0} orphanages
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {orphanages.map((o, i) => (
                <motion.div
                  key={o.orphanage_id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <OrphanageCard
                    orphanage={o}
                    onBookmark={handleBookmark}
                    bookmarked={bookmarked.has(o.orphanage_id)}
                  />
                </motion.div>
              ))}
            </div>
            <Pagination page={page} totalPages={pagination?.total_pages} onChange={setPage} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
