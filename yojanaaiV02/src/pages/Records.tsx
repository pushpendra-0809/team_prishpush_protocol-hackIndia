import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { getMockApplications } from '../services/mockData';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Search, Filter, ArrowUpRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Status } from '../types';

export const Records = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'All' | Status>('All');
  const [search, setSearch] = useState('');
  const applications = getMockApplications();

  const filteredApps = applications.filter(app => {
    const matchesFilter = filter === 'All' || app.status === filter;
    const matchesSearch = app.schemeName.toLowerCase().includes(search.toLowerCase()) || 
                         app.referenceNumber.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusInfo = (status: Status) => {
    switch (status) {
      case 'Approved': return { color: 'text-emerald-600', icon: CheckCircle2, bg: 'bg-emerald-50 dark:bg-emerald-900/20' };
      case 'Processing': return { color: 'text-blue-600', icon: Clock, bg: 'bg-blue-50 dark:bg-blue-900/20' };
      case 'Eligibility Check': return { color: 'text-orange-600', icon: AlertCircle, bg: 'bg-orange-50 dark:bg-orange-900/20' };
      case 'Submitted': return { color: 'text-slate-600', icon: Clock, bg: 'bg-slate-50 dark:bg-slate-900/20' };
      default: return { color: 'text-slate-600', icon: Clock, bg: 'bg-slate-50 dark:bg-slate-900/20' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('records')}</h2>
          <p className="text-slate-500 dark:text-slate-400">Detailed history of all your government scheme applications.</p>
        </div>
        <Button className="h-11 px-6">Apply for New Scheme</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search by scheme name or reference..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['All', 'Approved', 'Processing', 'Eligibility Check', 'Submitted'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all",
                filter === f 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
            >
              {f === 'All' ? t('all') : t(f.toLowerCase().replace(' ', '_'))}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredApps.map((app) => {
            const info = getStatusInfo(app.status);
            return (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-0 overflow-hidden group hover:border-blue-200 dark:hover:border-blue-900 transition-all">
                  <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                         <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 tracking-widest uppercase">ID: {app.id}</span>
                         <span className="text-slate-300 dark:text-slate-800 text-xs text-center">•</span>
                         <span className="text-xs font-bold text-slate-500 dark:text-slate-500">{t('applied_date')}: {app.appliedDate}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white truncate mb-1">{app.schemeName}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">Ref: {app.referenceNumber}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 md:justify-end">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('status')}</span>
                        <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold border uppercase", info.bg, info.color, "border-transparent")}>
                          <info.icon className="w-3.5 h-3.5" />
                          {t(app.status.toLowerCase().replace(' ', '_'))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end w-32">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('completion')}</span>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-600 rounded-full" style={{ width: `${app.completionPercentage}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white mt-1">{app.completionPercentage}%</span>
                      </div>

                      <Button variant="outline" size="icon" className="rounded-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-900 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4 text-slate-400" />
                     <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{app.benefitDetails}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

