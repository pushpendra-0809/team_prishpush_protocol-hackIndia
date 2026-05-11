import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      await login({ identifier, password });
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Left side: Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-center p-16 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-white/40 p-4 rounded-2xl backdrop-blur-md">
              <img 
  src="logo.png" 
  alt="Custom Shield" 
  className="w-24 h-24" 
/>

            </div>
            <h1 className="text-4xl font-bold tracking-tight">{t('app_name')}</h1>
          </div>
          
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Connecting citizens to <br />
            <span className="text-blue-200">government benefits</span> effortlessly.
          </h2>
          
          <div className="space-y-6">
            {[
              "Real-time scheme application tracking",
              "Secure Aadhaar-linked identity verification",
              "Instant benefit disbursement status",
              "Personalized recommendations via AI"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="text-lg text-blue-50 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="mt-auto pt-10 text-blue-200 font-medium">
          © 2024 Digital India Initiative. All rights reserved.
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
               {/* <ShieldCheck className="w-10 h-10 text-blue-600" /> */}
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <img 
  src="logo.png" 
  alt="Custom Shield" 
  className="w-24 h-24" 
/>

            </div>

               
               <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t('app_name')}</h1>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('login')}</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Enter your credentials to access your portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-white">
            <Input
              label={t('identifier')}
              placeholder="e.g. rajesh123 or 9876543210"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              leftIcon={<User className="w-5 h-5" />}
              error={error.includes('fields') && !identifier ? 'Required' : ''}
            />
            
            <Input
              label={t('password')}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              error={error.includes('fields') && !password ? 'Required' : ''}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-600 dark:text-slate-400 font-medium">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:underline font-semibold">Forgot password?</button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg" 
              isLoading={isLoading}
            >
              {t('login')}
            </Button>
          </form>

          <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-bold">
              {t('register')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
