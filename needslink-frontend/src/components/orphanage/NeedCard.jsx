import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { URGENCY_META, STATUS_META, CATEGORY_ICONS, timeAgo } from '../../utils/helpers';

export default function NeedCard({ need, onInterest, isInterested, compact = false }) {
  const {
    need_id, title, category, description, quantity, quantity_unit,
    urgency, status, created_at, images,
  } = need;

  const urg = URGENCY_META[urgency] || URGENCY_META.medium;
  const sta = STATUS_META[status]   || STATUS_META.open;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-forest/8 flex items-center justify-center text-xl shrink-0">
            {CATEGORY_ICONS[category] || '📦'}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-sm text-ink leading-snug line-clamp-2">{title}</h4>
            <p className="text-xs text-ink-muted mt-0.5 capitalize">{category}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end shrink-0">
          <span className={urg.className}>{urg.label}</span>
          <span className={sta.className}>{sta.label}</span>
        </div>
      </div>

      {!compact && (
        <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">{description}</p>
      )}

      {quantity && (
        <p className="text-xs text-ink font-medium">
          Quantity needed: <span className="text-forest font-bold">{quantity} {quantity_unit || ''}</span>
        </p>
      )}

      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-ink-light">{timeAgo(created_at)}</span>
        {status === 'open' && onInterest && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onInterest(need_id)}
            className={`btn btn-sm gap-1.5 ${isInterested ? 'bg-forest/10 text-forest border border-forest/20' : 'btn-primary'}`}
          >
            <Heart size={13} className={isInterested ? 'fill-forest' : ''} />
            {isInterested ? 'Interested' : 'I want to help'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
