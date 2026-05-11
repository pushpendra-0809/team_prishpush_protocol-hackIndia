import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { 
  User, 
  Phone, 
  CreditCard, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateOTP } from '../services/mockData';

export const Register = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    phoneNumber: '',
    aadhaarNumber: '',
    category: 'General',
    state: '',
    district: '',
    password: '',
  });
  
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const sendOtp = () => {
    setIsSending(true);
    setTimeout(() => {
      const code = generateOTP();
      setSentOtp(code);
      setIsSending(false);
      alert(`MOCK OTP for ${formData.aadhaarNumber}: ${code}`);
    }, 1000);
  };

  const handleFinish = async () => {
    if (otp !== sentOtp) {
      alert('Invalid OTP');
      return;
    }
    
    setIsVerifying(true);
    await register(formData);
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <div className="p-4 lg:p-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
        <Link to="/login" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Login</span>
        </Link>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold uppercase tracking-tight">{t('app_name')}</h1>
        </div>
        <div className="w-24 hidden md:block" />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl"
        >
          <Card className="p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Steps Progress */}
              <div className="md:w-1/3 bg-slate-50 dark:bg-slate-900/50 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-8">
                <div className="space-y-8">
                  {[
                    { n: 1, label: 'Basic Info', desc: 'Personal details' },
                    { n: 2, label: 'Location & Security', desc: 'Regional specifics' },
                    { n: 3, label: 'Verification', desc: 'Aadhaar OTP' }
                  ].map((s) => (
                    <div key={s.n} className="flex gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all",
                        step === s.n ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : 
                        step > s.n ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                      )}>
                        {step > s.n ? '✓' : s.n}
                      </div>
                      <div className="flex flex-col">
                        <span className={cn("font-bold text-sm", step === s.n ? "text-blue-600 dark:text-blue-400" : "text-slate-500")}>
                          {s.label}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-8 lg:p-12">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h2 className="text-2xl font-extrabold">{t('register')}</h2>
                        <p className="text-slate-500 dark:text-slate-400">Step 1: Tell us who you are.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label={t('full_name')}
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          leftIcon={<User className="w-5 h-5" />}
                        />
                        <Input
                          label={t('username')}
                          placeholder="johndoe123"
                          value={formData.userName}
                          onChange={(e) => setFormData({...formData, userName: e.target.value})}
                        />
                        <Input
                          label={t('phone')}
                          placeholder="9876543210"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                          leftIcon={<Phone className="w-5 h-5" />}
                        />
                        <Input
                          label={t('category')}
                          placeholder="e.g. General, OBC, SC/ST"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          leftIcon={<Briefcase className="w-5 h-5" />}
                        />
                      </div>
                      
                      <Button onClick={handleNext} className="w-full md:w-auto h-12 px-10 gap-2">
                        Next <ArrowRight className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h2 className="text-2xl font-extrabold">Regional & Security</h2>
                        <p className="text-slate-500 dark:text-slate-400">Step 2: Security settings.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label={t('state')}
                          placeholder="Maharashtra"
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          leftIcon={<MapPin className="w-5 h-5" />}
                        />
                        <Input
                          label={t('district')}
                          placeholder="Mumbai"
                          value={formData.district}
                          onChange={(e) => setFormData({...formData, district: e.target.value})}
                        />
                        <Input
                          label={t('aadhaar')}
                          placeholder="1234 5678 9012"
                          value={formData.aadhaarNumber}
                          onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value})}
                          leftIcon={<CreditCard className="w-5 h-5" />}
                        />
                        <Input
                          label={t('password')}
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                      </div>
                      
                      <div className="flex gap-4">
                        <Button variant="outline" onClick={handleBack} className="flex-1 md:flex-none h-12 px-10 border border-slate-200 dark:border-slate-800">
                          Back
                        </Button>
                        <Button onClick={handleNext} className="flex-1 md:flex-none h-12 px-10 gap-2">
                          Next <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
                            <ShieldCheck className="w-12 h-12 text-blue-600" />
                          </div>
                        </div>
                        <h2 className="text-2xl font-extrabold">Identity Verification</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                          Verify your Aadhaar ending in {formData.aadhaarNumber.slice(-4)}
                        </p>
                      </div>

                      <div className="space-y-4 max-w-sm mx-auto">
                        {!sentOtp ? (
                          <Button onClick={sendOtp} className="w-full h-12" isLoading={isSending}>
                            {t('send_otp')}
                          </Button>
                        ) : (
                          <div className="space-y-6">
                            <Input
                              label="Enter 6-digit OTP"
                              placeholder="000000"
                              className="text-center text-2xl tracking-[0.5em] font-bold h-16"
                              maxLength={6}
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <Button variant="ghost" className="flex-1" onClick={sendOtp}>{t('resend_otp')}</Button>
                              <Button className="flex-1" onClick={handleFinish} isLoading={isVerifying}>{t('verify_otp')}</Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-center">
                         <Button variant="ghost" onClick={handleBack} disabled={isVerifying}>Back to Edit</Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
