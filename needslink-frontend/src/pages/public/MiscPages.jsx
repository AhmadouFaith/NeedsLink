import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Shield, Bell, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

/* ─── About Page ──────────────────────────────────────────── */
export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero text-white py-20">
        <div className="page-container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label text-green-300">Our Story</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-5 max-w-2xl text-balance">
              Built for the children of Cameroon
            </h1>
            <p className="text-white/80 text-lg max-w-xl leading-relaxed">
              NeedsLink was created to eliminate the gap between willing donors and orphanages
              who struggle to communicate their needs. We believe every orphanage deserves
              to be seen, and every donor deserves to know their impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-ivory">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-label">Our Mission</span>
              <h2 className="font-display text-3xl font-bold text-ink mt-3 mb-5">Transparency. Accountability. Compassion.</h2>
              <p className="text-ink-muted leading-relaxed mb-4">
                Many orphanages in Cameroon operate without a digital presence, making it
                impossible for donors — local or international — to discover their needs
                or verify their legitimacy.
              </p>
              <p className="text-ink-muted leading-relaxed">
                NeedsLink solves this by providing a verified, centralized platform where
                orphanages post their real needs, and donors can connect, contribute, and
                follow up on the impact of their generosity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: '40+',  label: 'Orphanages', icon: '🏛️' },
                { num: '200+', label: 'Donors',     icon: '❤️' },
                { num: '150+', label: 'Needs Filled', icon: '✅' },
                { num: '500+', label: 'Children Helped', icon: '👶' },
              ].map(({ num, label, icon }) => (
                <div key={label} className="card p-5 text-center">
                  <div className="text-3xl mb-2">{icon}</div>
                  <p className="font-display text-2xl font-bold text-forest">{num}</p>
                  <p className="text-xs text-ink-muted">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="page-container text-center">
          <span className="section-label">Our Values</span>
          <h2 className="font-display text-3xl font-bold text-ink mt-3 mb-12">What we stand for</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={28} />, title: 'Verified Trust', desc: 'Every orphanage on NeedsLink is manually reviewed and approved before going public.' },
              { icon: <CheckCircle2 size={28} />, title: 'Real Accountability', desc: 'Orphanages share updates on how donations are used, so donors see their impact firsthand.' },
              { icon: <Heart size={28} />, title: 'Community-Driven', desc: 'Built by students who believe that technology can amplify human kindness in Cameroon.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-forest/10 text-forest flex items-center justify-center mx-auto mb-5">{icon}</div>
                <h3 className="font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest text-white">
        <div className="page-container text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Join the NeedsLink community</h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">Whether you're a donor or an orphanage, your presence here makes a difference.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn btn-lg bg-white text-forest hover:bg-green-50 font-semibold">
              Get started free <ArrowRight size={18} />
            </Link>
            <Link to="/orphanages" className="btn btn-lg bg-transparent border-2 border-white/40 text-white hover:bg-white/10">
              Browse Orphanages
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─── 404 Page ──────────────────────────────────────────────── */
export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="font-display text-9xl font-black text-forest/15 leading-none mb-4">404</div>
          <h1 className="font-display text-2xl font-bold text-ink mb-3">Page not found</h1>
          <p className="text-ink-muted mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">Go home</Link>
            <Link to="/orphanages" className="btn-secondary">Browse Orphanages</Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

/* ─── Unauthorized Page ─────────────────────────────────────── */
export function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="text-7xl mb-4">🔒</div>
          <h1 className="font-display text-2xl font-bold text-ink mb-3">Access denied</h1>
          <p className="text-ink-muted mb-8">You don't have permission to view this page.</p>
          <Link to="/" className="btn-primary">Return home</Link>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
