import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, LogOut, User, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ROLE_DASH = { donor: '/donor/dashboard', orphanage: '/orphanage/dashboard', admin: '/admin/dashboard' };

export default function Navbar() {
  const { isAuth, user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen]     = useState(false);
  const [ddOpen, setDdOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-forest/10 shadow-sm">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center">
              <Heart size={16} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-xl text-ink">
              Needs<span className="text-forest">Link</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={`nav-item ${isActive('/') ? 'nav-item-active' : ''}`}>Home</Link>
            <Link to="/orphanages" className={`nav-item ${isActive('/orphanages') ? 'nav-item-active' : ''}`}>Browse Orphanages</Link>
            <Link to="/about" className={`nav-item ${isActive('/about') ? 'nav-item-active' : ''}`}>About</Link>
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuth ? (
              <div className="relative">
                <button
                  onClick={() => setDdOpen(v => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-forest/8 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-forest/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-forest">{user?.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-ink max-w-[120px] truncate">{user?.name}</span>
                  <ChevronDown size={14} className={`text-ink-muted transition-transform ${ddOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {ddOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-48 card py-1 shadow-hover"
                    >
                      <Link
                        to={ROLE_DASH[user?.role] || '/'}
                        onClick={() => setDdOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-forest/8 transition-colors"
                      >
                        <LayoutDashboard size={15} className="text-forest" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setDdOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-forest/8 transition-colors"
                      >
                        <User size={15} className="text-forest" />
                        Settings
                      </Link>
                      <div className="divider my-1" />
                      <button
                        onClick={() => { handleLogout(); setDdOpen(false); }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-ember hover:bg-ember/8 transition-colors"
                      >
                        <LogOut size={15} />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost btn-sm">Log in</Link>
                <Link to="/register" className="btn-primary btn-sm">Get started</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 rounded-lg hover:bg-forest/8 transition-colors">
            {open ? <X size={22} className="text-ink" /> : <Menu size={22} className="text-ink" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-forest/10 bg-white"
          >
            <div className="page-container py-3 flex flex-col gap-1">
              <Link to="/" onClick={() => setOpen(false)} className="nav-item">Home</Link>
              <Link to="/orphanages" onClick={() => setOpen(false)} className="nav-item">Browse Orphanages</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="nav-item">About</Link>
              <div className="divider" />
              {isAuth ? (
                <>
                  <Link to={ROLE_DASH[user?.role]} onClick={() => setOpen(false)} className="nav-item">Dashboard</Link>
                  <button onClick={() => { handleLogout(); setOpen(false); }} className="nav-item text-ember">Log out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary w-full justify-center">Log in</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">Get started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
