import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Search, ArrowRight, Users, Package, CheckCircle2, Shield, Bell } from 'lucide-react';
import { useFetch } from '../../hooks/useFetch';
import OrphanageCard from '../../components/orphanage/OrphanageCard';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const STEPS = [
  { icon: '📝', role: 'For Donors', title: 'Find an Orphanage', desc: 'Browse verified orphanages across Cameroon and discover their real, current needs.' },
  { icon: '❤️', role: 'For Donors', title: 'Choose How to Help', desc: 'Select a specific need — food, clothing, school supplies, or medicine — and express your interest.' },
  { icon: '🤝', role: 'For Donors', title: 'Connect & Contribute', desc: 'Receive the orphanage\'s contact details and coordinate your donation directly with them.' },
];

const ORPHANAGE_STEPS = [
  { icon: '🏛️', role: 'For Orphanages', title: 'Register & Get Verified', desc: 'Create your orphanage profile and get verified by our admin team to build donor trust.' },
  { icon: '📢', role: 'For Orphanages', title: 'Post Your Needs', desc: 'List your current needs with urgency levels so donors know exactly where help is required.' },
  { icon: '📬', role: 'For Orphanages', title: 'Receive Support', desc: 'Get notified when donors want to help and share updates on how donations were used.' },
];

export default function LandingPage() {
  const { data } = useFetch('/orphanages?limit=6&verified=true');
  const orphanages = data?.orphanages || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section className="gradient-hero text-white relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/3 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        {/* Cameroonian flag stripe accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex pointer-events-none">
          <div className="flex-1 bg-forest-400" />
          <div className="flex-1 bg-ember" />
          <div className="flex-1 bg-gold" />
        </div>

        <div className="page-container py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-green-300">
                <span className="w-6 h-px bg-green-300" />
                Connecting Hearts Across Cameroon
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-display text-4xl md:text-6xl font-bold leading-tight text-balance mb-6"
            >
              Every Child Deserves{' '}
              <span className="text-gold-300 relative">
                Kindness
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6 Q100 2 198 6" stroke="#F57F17" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl"
            >
              NeedsLink connects generous donors with verified orphanages in Cameroon.
              Discover real needs, make a real difference — one child at a time.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link to="/orphanages" className="btn btn-lg bg-white text-forest hover:bg-green-50 shadow-lg font-semibold">
                <Search size={18} /> Browse Orphanages
              </Link>
              <Link to="/register" className="btn btn-lg bg-transparent text-white border-2 border-white/40 hover:bg-white/10">
                Join as Donor <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-forest/10">
        <div className="page-container py-6">
          <div className="grid grid-cols-3 divide-x divide-forest/10">
            {[
              { icon: '🏛️', val: '40+',  label: 'Verified Orphanages' },
              { icon: '👥', val: '200+', label: 'Registered Donors' },
              { icon: '❤️', val: '150+', label: 'Needs Fulfilled' },
            ].map(({ icon, val, label }) => (
              <div key={label} className="text-center px-4 py-2">
                <div className="text-2xl mb-1">{icon}</div>
                <p className="font-display font-bold text-2xl text-forest">{val}</p>
                <p className="text-xs text-ink-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-ivory">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-14"
          >
            <span className="section-label">How it works</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mt-3 text-balance">
              Simple steps, lasting impact
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[STEPS, ORPHANAGE_STEPS].map((group, gi) => (
              <div key={gi}>
                <p className="section-label mb-6">{group[0].role}</p>
                <div className="space-y-6">
                  {group.map((step, i) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: gi === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-2xl shrink-0">{step.icon}</div>
                      <div>
                        <h3 className="font-semibold text-ink mb-1">{step.title}</h3>
                        <p className="text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured orphanages ── */}
      {orphanages.length > 0 && (
        <section className="py-20 bg-white">
          <div className="page-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="section-label">Featured</span>
                <h2 className="font-display text-3xl font-bold text-ink mt-2">Orphanages needing your help</h2>
              </div>
              <Link to="/orphanages" className="btn-secondary btn-sm hidden md:flex">
                See all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {orphanages.slice(0, 6).map((o, i) => (
                <motion.div
                  key={o.orphanage_id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <OrphanageCard orphanage={o} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link to="/orphanages" className="btn-primary">See all orphanages</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Trust section ── */}
      <section className="py-20 bg-forest text-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-300">Why NeedsLink</span>
            <h2 className="font-display text-3xl font-bold mt-3">Built on trust, driven by compassion</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={24} />, title: 'Verified Orphanages', desc: 'Every orphanage is reviewed and approved by our admin team before appearing on the platform.' },
              { icon: <Bell size={24} />,   title: 'Real-time Notifications', desc: 'Donors are notified when orphanages post new needs. Orphanages hear when donors want to help.' },
              { icon: <CheckCircle2 size={24} />, title: 'Transparent Updates', desc: 'Orphanages share how your donations were used, so you always know the impact you made.' },
            ].map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 text-green-300">{icon}</div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-ivory">
        <div className="page-container text-center">
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
              Ready to make a difference?
            </h2>
            <p className="text-ink-muted mb-8 max-w-md mx-auto">
              Join hundreds of donors who are already transforming lives across Cameroon.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register?role=donor" className="btn-primary btn-lg">
                <Heart size={18} /> I want to donate
              </Link>
              <Link to="/register?role=orphanage" className="btn-secondary btn-lg">
                Register an Orphanage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
