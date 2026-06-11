import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="page-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center">
                <Heart size={16} className="text-white fill-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Needs<span className="text-forest-400">Link</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Connecting generous hearts with orphanages across Cameroon.
              Every need posted is a child's life waiting to be touched.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-forest-400 mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[['/', 'Home'], ['/orphanages', 'Browse Orphanages'], ['/about', 'About Us'], ['/register', 'Join as Donor'], ['/register', 'Register Orphanage']].map(([to, label]) => (
                <li key={label}><Link to={to} className="text-sm text-white/60 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-forest-400 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[['#', 'Privacy Policy'], ['#', 'Terms of Use'], ['#', 'Cookie Policy']].map(([to, label]) => (
                <li key={label}><Link to={to} className="text-sm text-white/60 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-forest-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={14} className="mt-0.5 shrink-0 text-forest-400" />
                University of Buea, South West Region, Cameroon
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={14} className="shrink-0 text-forest-400" />
                support@needslink.cm
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone size={14} className="shrink-0 text-forest-400" />
                +237 600 000 000
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} NeedsLink. All rights reserved.</p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Built with <Heart size={10} className="text-ember-400 fill-current" /> for the children of Cameroon
          </p>
        </div>
      </div>
    </footer>
  );
}
