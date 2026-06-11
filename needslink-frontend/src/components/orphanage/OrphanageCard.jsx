import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Bookmark } from 'lucide-react';
import { imgUrl, truncate } from '../../utils/helpers';

export default function OrphanageCard({ orphanage, onBookmark, bookmarked }) {
  const {
    orphanage_id, org_name, location, description,
    profile_image_url, verified, open_needs_count,
  } = orphanage;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="card-hover group relative flex flex-col"
    >
      {/* Cover image */}
      <div className="relative h-44 bg-gradient-to-br from-forest/20 to-forest/40 overflow-hidden">
        {profile_image_url ? (
          <img src={imgUrl(profile_image_url)} alt={org_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">🏛️</span>
          </div>
        )}
        <div className="absolute inset-0 gradient-card" />

        {/* Bookmark button */}
        {onBookmark && (
          <button
            onClick={(e) => { e.preventDefault(); onBookmark(orphanage_id); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <Bookmark size={14} className={bookmarked ? 'fill-forest text-forest' : 'text-ink-muted'} />
          </button>
        )}

        {/* Verified badge */}
        {verified === 1 && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-forest text-white shadow-sm">
              <CheckCircle size={10} className="fill-white" /> Verified
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-base text-ink leading-snug mb-1 line-clamp-1">{org_name}</h3>
        <div className="flex items-center gap-1 text-xs text-ink-muted mb-3">
          <MapPin size={11} />
          <span className="truncate">{location}</span>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed flex-1 mb-4">
          {truncate(description, 90)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-center">
            <p className="text-lg font-display font-bold text-forest">{open_needs_count ?? 0}</p>
            <p className="text-[10px] text-ink-muted">Open needs</p>
          </div>
          <Link
            to={`/orphanages/${orphanage_id}`}
            className="btn-primary btn-sm"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
