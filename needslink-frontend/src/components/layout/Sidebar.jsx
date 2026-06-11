import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DONOR_LINKS = [
  { to: '/donor/dashboard',  icon: '🏠', label: 'Dashboard' },
  { to: '/orphanages',       icon: '🏛️', label: 'Browse Orphanages' },
  { to: '/donor/bookmarks',  icon: '🔖', label: 'My Bookmarks' },
  { to: '/donor/activity',   icon: '📋', label: 'My Activity' },
  { to: '/messages',         icon: '💬', label: 'Messages' },
  { to: '/settings',         icon: '⚙️', label: 'Settings' },
];
const ORPHANAGE_LINKS = [
  { to: '/orphanage/dashboard',      icon: '🏠', label: 'Dashboard' },
  { to: '/orphanage/profile',        icon: '🏛️', label: 'My Profile' },
  { to: '/orphanage/needs/new',      icon: '➕', label: 'Post a Need' },
  { to: '/orphanage/needs',          icon: '📋', label: 'My Needs' },
  { to: '/orphanage/updates',        icon: '📢', label: 'Donation Updates' },
  { to: '/messages',                 icon: '💬', label: 'Messages' },
  { to: '/settings',                 icon: '⚙️', label: 'Settings' },
];
const ADMIN_LINKS = [
  { to: '/admin/dashboard',    icon: '📊', label: 'Dashboard' },
  { to: '/admin/verifications',icon: '✅', label: 'Verifications' },
  { to: '/admin/users',        icon: '👥', label: 'Users' },
  { to: '/admin/content',      icon: '🛡️', label: 'Content' },
  { to: '/settings',           icon: '⚙️', label: 'Settings' },
];

const LINKS_BY_ROLE = { donor: DONOR_LINKS, orphanage: ORPHANAGE_LINKS, admin: ADMIN_LINKS };

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = LINKS_BY_ROLE[user?.role] || DONOR_LINKS;

  const handleLogout = () => { logout(); navigate('/'); };

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-forest/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-forest flex items-center justify-center">
            <Heart size={13} className="text-white fill-white" />
          </div>
          <span className="font-display font-bold text-lg text-ink">
            Needs<span className="text-forest">Link</span>
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1.5 rounded-lg hover:bg-forest/8">
            <X size={18} className="text-ink-muted" />
          </button>
        )}
      </div>

      {/* User pill */}
      <div className="px-4 py-4 border-b border-forest/10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-forest/6">
          <div className="w-9 h-9 rounded-full bg-forest/20 flex items-center justify-center shrink-0">
            <span className="text-base font-bold text-forest">{user?.name?.[0]?.toUpperCase()}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{user?.name}</p>
            <p className="text-xs text-ink-light capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) => isActive ? 'nav-item-active' : 'nav-item'}
          >
            <span className="text-base leading-none">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-forest/10">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-ember hover:bg-ember/8 transition-colors"
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-forest/10 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col md:hidden shadow-2xl"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
