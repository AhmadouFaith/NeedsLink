import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Inbox } from 'lucide-react';

/* ─── Spinner ─────────────────────────────────────────────── */
export function Spinner({ size = 20, className = '' }) {
  return <Loader2 size={size} className={`animate-spin text-forest ${className}`} />;
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="text-center">
        <Spinner size={32} className="mx-auto mb-3" />
        <p className="text-sm text-ink-muted">Loading…</p>
      </div>
    </div>
  );
}

/* ─── Input ───────────────────────────────────────────────── */
export const Input = forwardRef(function Input(
  { label, error, className = '', ...props }, ref
) {
  return (
    <div className="w-full">
      {label && <label className="input-label">{label}</label>}
      <input ref={ref} className={`input-field ${error ? 'border-ember focus:ring-ember/20 focus:border-ember' : ''} ${className}`} {...props} />
      {error && <p className="input-error"><AlertCircle size={11} className="inline mr-1" />{error}</p>}
    </div>
  );
});

/* ─── Textarea ────────────────────────────────────────────── */
export const Textarea = forwardRef(function Textarea(
  { label, error, className = '', ...props }, ref
) {
  return (
    <div className="w-full">
      {label && <label className="input-label">{label}</label>}
      <textarea ref={ref} rows={4} className={`input-field resize-none ${error ? 'border-ember focus:ring-ember/20' : ''} ${className}`} {...props} />
      {error && <p className="input-error"><AlertCircle size={11} className="inline mr-1" />{error}</p>}
    </div>
  );
});

/* ─── Select ──────────────────────────────────────────────── */
export const Select = forwardRef(function Select(
  { label, error, children, className = '', ...props }, ref
) {
  return (
    <div className="w-full">
      {label && <label className="input-label">{label}</label>}
      <select ref={ref} className={`input-field ${error ? 'border-ember' : ''} ${className}`} {...props}>
        {children}
      </select>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
});

/* ─── Stat card ───────────────────────────────────────────── */
export function StatCard({ label, value, icon, color = 'green', delta }) {
  const colors = {
    green:  'bg-forest/8  text-forest',
    red:    'bg-ember/8   text-ember',
    gold:   'bg-gold/20   text-gold-800',
    earth:  'bg-earth/8   text-earth',
  };
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card p-5 flex items-start gap-4"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-ink">{value ?? '—'}</p>
        <p className="text-xs text-ink-muted mt-0.5">{label}</p>
        {delta !== undefined && (
          <p className={`text-xs font-medium mt-1 ${delta >= 0 ? 'text-forest' : 'text-ember'}`}>
            {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)} this week
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Empty state ─────────────────────────────────────────── */
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="text-5xl mb-4">{icon || <Inbox size={48} className="text-ink-light" />}</div>
      <h3 className="font-display font-semibold text-lg text-ink mb-2">{title}</h3>
      {description && <p className="text-sm text-ink-muted max-w-xs mb-6">{description}</p>}
      {action}
    </div>
  );
}

/* ─── Alert banner ────────────────────────────────────────── */
export function Alert({ type = 'error', message }) {
  if (!message) return null;
  const styles = {
    error:   'bg-ember/10 border-ember/30 text-ember-800',
    success: 'bg-forest/10 border-forest/30 text-forest-800',
    info:    'bg-blue-50 border-blue-200 text-blue-800',
  };
  return (
    <div className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>
      <AlertCircle size={15} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/* ─── Confirm modal ───────────────────────────────────────── */
export function ConfirmModal({ open, title, message, onConfirm, onCancel, danger = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative card p-6 max-w-sm w-full shadow-2xl"
      >
        <h3 className="font-display font-semibold text-lg text-ink mb-2">{title}</h3>
        <p className="text-sm text-ink-muted mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={onConfirm} className={danger ? 'btn-danger' : 'btn-primary'}>Confirm</button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Pagination ──────────────────────────────────────────── */
export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="btn-secondary btn-sm disabled:opacity-40"
      >← Prev</button>
      <span className="text-sm text-ink-muted px-3">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="btn-secondary btn-sm disabled:opacity-40"
      >Next →</button>
    </div>
  );
}
