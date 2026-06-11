export const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export function imgUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)   return 'Just now';
  if (m < 60)  return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)  return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7)   return `${d}d ago`;
  return formatDate(date);
}

export function truncate(str, len = 100) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
}

export const URGENCY_META = {
  critical: { label: 'Critical', className: 'urgency-critical' },
  high:     { label: 'High',     className: 'urgency-high' },
  medium:   { label: 'Medium',   className: 'urgency-medium' },
  low:      { label: 'Low',      className: 'urgency-low' },
};

export const STATUS_META = {
  open:                { label: 'Open',              className: 'status-open' },
  partially_fulfilled: { label: 'Partially Helped',  className: 'status-partially' },
  fulfilled:           { label: 'Fulfilled',         className: 'status-fulfilled' },
  closed:              { label: 'Closed',            className: 'status-closed' },
};

export const CATEGORY_ICONS = {
  food:      '🍚',
  clothing:  '👕',
  medical:   '💊',
  education: '📚',
  financial: '💰',
  other:     '📦',
};

export const NEED_CATEGORIES = ['food','clothing','medical','education','financial','other'];
