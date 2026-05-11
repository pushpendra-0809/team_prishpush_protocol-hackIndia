import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Pencil, 
  Save, 
  X,
  CreditCard,
  Briefcase,
  IndianRupee,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Profile = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleSave = () => {
    updateUser(formData as any);
    setIsEditing(false);
  };

  const fields = [
    { key: 'fullName', label: t('full_name'), icon: User },
    { key: 'userName', label: t('username'), icon: User, disabled: true },
    { key: 'phoneNumber', label: t('phone'), icon: Phone },
    { key: 'aadhaarNumber', label: t('aadhaar'), icon: CreditCard, mask: true },
    { key: 'state', label: t('state'), icon: MapPin },
    { key: 'district', label: t('district'), icon: MapPin },
    { key: 'category', label: t('category'), icon: Briefcase },
    { key: 'gender', label: t('gender'), icon: User },
    { key: 'occupation', label: t('occupation'), icon: Briefcase },
    { key: 'annualIncome', label: t('annual_income'), icon: IndianRupee },
    { key: 'age', label: t('age'), icon: Calendar },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-4xl font-extrabold shadow-xl shadow-blue-500/20">
            {user?.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">{user?.fullName}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">@{user?.userName} • Aadhaar Verified</p>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button onClick={() => setIsEditing(true)} className="gap-2 px-8">
                <Pencil className="w-4 h-4" /> {t('edit_profile')}
              </Button>
            </motion.div>
          ) : (
            <motion.div key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="px-8 border border-slate-200 dark:border-slate-800">
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2 px-8 bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4" /> {t('save_changes')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-900 pb-4">
             <ShieldCheck className="w-6 h-6 text-blue-600" />
             <h3 className="text-xl font-bold">{t('profile')} Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 p-2">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1.5 group">
                <div className="flex items-center gap-2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                   <field.icon className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-wider">{field.label}</span>
                </div>
                
                {isEditing && !field.disabled ? (
                  <Input
                    value={(formData as any)[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="h-12 text-base font-semibold"
                  />
                ) : (
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100 pl-6 border-l-2 border-slate-200 dark:border-slate-800 group-hover:border-blue-500 transition-all">
                    {field.mask && !isEditing ? (user as any)[field.key].replace(/\d(?=\d{4})/g, "X") : (user as any)[field.key] || 'Not specified'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-blue-600 text-white border-none shadow-xl shadow-blue-500/20">
           <h4 className="text-xl font-extrabold mb-2">Account Security</h4>
           <p className="text-blue-100 text-sm mb-6">Your identity is secured via UIDAI Aadhaar Gateway. Two-factor authentication is active.</p>
           <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50">Manage Security</Button>
        </Card>

        <Card className="bg-emerald-600 text-white border-none shadow-xl shadow-emerald-500/20">
           <h4 className="text-xl font-extrabold mb-2">Digital Documents</h4>
           <p className="text-emerald-100 text-sm mb-6">Access your verified documents like Income Certificate, Caste Certificate, etc.</p>
           <Button variant="secondary" className="w-full bg-white text-emerald-600 hover:bg-emerald-50 text-emerald-600">Open DigiLocker</Button>
        </Card>
      </div>
    </div>
  );
};
