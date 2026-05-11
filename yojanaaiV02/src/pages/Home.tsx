import React from 'react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/Card';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getMockApplications, getMockBenefits } from '../services/mockData';
import { motion } from 'motion/react';
import { Button } from '../components/Button';

export const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const applications = getMockApplications();
  const benefits = getMockBenefits();

  const stats = [
    { label: t('total_apps'), value: applications.length, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/10' },
    { label: t('completed'), value: 1, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
    { label: t('pending'), value: 1, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/10' },
    { label: t('in_progress'), value: 2, icon: AlertCircle, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/10' },
  ];

  const currentApp = applications[2]; // PM-Kisan

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl shadow-blue-500/20"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">
            {t('welcome')}, {user?.fullName}!
          </h1>
          <p className="text-blue-100 text-lg mb-6 leading-relaxed">
            Your government scheme dashboard is up to date. You have 2 applications requiring attention this week.
          </p>
          <div className="flex flex-wrap gap-4">
             <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-semibold flex items-center gap-2">
                Last login: Today, 10:45 AM
             </div>
             <div className="px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-lg border border-emerald-400/20 text-sm font-semibold flex items-center gap-2">
                Aadhaar verified: <CheckCircle2 className="w-4 h-4" />
             </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-default flex items-center gap-4 py-6">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Tracker */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                {t('tracker')}
              </h3>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent: {currentApp.schemeName}</span>
            </div>

            <div className="space-y-8">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800 rounded-full" />

                {/* Stages */}
                {[
                  { name: t('submitted'), done: true, current: false },
                  { name: t('eligibility'), done: true, current: true },
                  { name: t('docs_review'), done: false, current: false },
                  { name: t('processing'), done: false, current: false },
                  { name: t('approved'), done: false, current: false },
                ].map((stage, i) => (
                  <div key={i} className="relative pl-14 pb-8 last:pb-0">
                    <div className={cn(
                      "absolute left-4 top-0 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950 transition-all z-10",
                      stage.done ? (stage.current ? "bg-blue-600 scale-125" : "bg-emerald-500") : "bg-slate-200 dark:bg-slate-800"
                    )} />
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-sm font-bold",
                        stage.current ? "text-blue-600 dark:text-blue-400" : stage.done ? "text-emerald-600" : "text-slate-400"
                      )}>
                        {stage.name}
                      </span>
                      {stage.current && (
                        <span className="text-xs text-slate-500 mt-1">Pending verification at regional office. Estimated completion: 5 days.</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-semibold">Overall Progress</span>
                   <span className="text-sm font-bold text-blue-600">{currentApp.completionPercentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${currentApp.completionPercentage}%` }}
                    className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="flex flex-col gap-8">
           <Card className="h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              {t('benefits')}
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="group p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all">
                   <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider">{benefit.name}</p>
                      <span className={cn(
                        "text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase",
                        benefit.status === 'Active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                      )}>
                        {benefit.status}
                      </span>
                   </div>
                   <p className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{benefit.amount}</p>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-4 gap-2 text-emerald-600">
                View All Benefits <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

