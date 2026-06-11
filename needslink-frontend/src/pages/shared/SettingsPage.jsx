import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Input, Textarea, Alert, Spinner } from '../../components/ui/index';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState('profile');

  return (
    <DashboardLayout>
      <div className="page-header">
        <span className="section-label">Account</span>
        <h1 className="font-display text-2xl font-bold text-ink mt-1">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-forest/10 mb-8">
        {[['profile', '👤 Profile'], ['password', '🔒 Password']].map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === t ? 'border-forest text-forest' : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-xl">
        {tab === 'profile' && <ProfileForm user={user} updateUser={updateUser} />}
        {tab === 'password' && <PasswordForm />}
      </div>
    </DashboardLayout>
  );
}

function ProfileForm({ user, updateUser }) {
  const [form, setForm]     = useState({
    name:           user?.name || '',
    phone:          user?.profile?.phone || '',
    location:       user?.profile?.location || '',
    bio:            user?.profile?.bio || '',
    description:    user?.profile?.description || '',
    contact_person: user?.profile?.contact_person || '',
    org_name:       user?.profile?.org_name || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = user.role === 'orphanage'
        ? `/orphanages/${user.profile?.orphanage_id}`
        : '/donor/profile';
      const { data } = await api.put(endpoint, form);
      updateUser({ name: form.name, profile: { ...user.profile, ...form } });
      toast.success('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
      <h2 className="font-semibold text-ink mb-6">Profile information</h2>
      <Alert type="error" message={error} />
      {error && <div className="mb-5" />}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Full Name" value={form.name} onChange={set('name')} required />

        {user?.role === 'orphanage' && (
          <>
            <Input label="Organisation Name" value={form.org_name} onChange={set('org_name')} />
            <Input label="Location" value={form.location} onChange={set('location')} placeholder="City, Region" />
            <Input label="Contact Person" value={form.contact_person} onChange={set('contact_person')} />
            <Input label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} />
            <Textarea label="Description" value={form.description} onChange={set('description')} rows={4} maxLength={300} />
          </>
        )}

        {user?.role === 'donor' && (
          <>
            <Input label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} />
            <Input label="Location" value={form.location} onChange={set('location')} placeholder="City, Region" />
            <Textarea label="Bio" value={form.bio} onChange={set('bio')} rows={3} placeholder="Tell orphanages a little about yourself…" />
          </>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary gap-2">
            {loading ? <Spinner size={16} className="text-white" /> : <Save size={15} />}
            Save changes
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function PasswordForm() {
  const [form, setForm]     = useState({ current: '', password: '', confirm: '' });
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('New passwords do not match.'); return; }
    if (form.password.length < 8)       { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await api.put('/auth/change-password', { current_password: form.current, new_password: form.password });
      toast.success('Password changed successfully!');
      setForm({ current: '', password: '', confirm: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
      <h2 className="font-semibold text-ink mb-6">Change password</h2>
      <Alert type="error" message={error} />
      {error && <div className="mb-5" />}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Input label="Current password" type={show ? 'text' : 'password'} value={form.current} onChange={set('current')} required placeholder="Your current password" />
          <button type="button" onClick={() => setShow(v => !v)} className="absolute right-3 top-9 text-ink-muted">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <Input label="New password" type="password" value={form.password} onChange={set('password')} required minLength={8} placeholder="Min 8 characters" />
        <Input
          label="Confirm new password"
          type="password"
          value={form.confirm}
          onChange={set('confirm')}
          required
          error={form.confirm && form.confirm !== form.password ? 'Passwords do not match' : ''}
        />
        <div className="pt-2">
          <button type="submit" disabled={loading} className="btn-primary gap-2">
            {loading ? <Spinner size={16} className="text-white" /> : <Save size={15} />}
            Update password
          </button>
        </div>
      </form>
    </motion.div>
  );
}
