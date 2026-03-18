import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      setIsAuthenticated(true);
    }

    setLoading(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 md:pt-32 pb-20">
      <SectionWrapper>
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="glass-dark border border-white/6 rounded-[2rem] p-8 md:p-10"
          >
            <p className="text-white/40 uppercase tracking-[0.35em] text-xs mb-4">
              Admin Access
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-5">
              Sign in to dashboard
            </h1>

            <p className="text-white/60 text-base leading-8 mb-8">
              This area is restricted to Timigaga Studios internal admin access only.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 text-white outline-none transition-all placeholder:text-white/25 focus:border-[#95EF90] focus:ring-1 focus:ring-[#95EF90]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 text-white outline-none transition-all placeholder:text-white/25 focus:border-[#95EF90] focus:ring-1 focus:ring-[#95EF90]"
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="aura"
                size="md"
                disabled={loading}
                className="text-[11px] uppercase tracking-[0.18em] font-semibold px-8"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AdminLogin;