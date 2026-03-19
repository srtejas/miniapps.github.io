/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  UserCheck, 
  Briefcase, 
  Search, 
  ExternalLink,
  Plus,
  Settings,
  Bell,
  X,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MiniApp {
  id: string;
  title: string;
  url: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const INITIAL_APPS: MiniApp[] = [
  {
    id: 'opal-main',
    title: 'Opal Workspace',
    url: 'https://opal.google/app/1rOQH_TdOy2p1lgrvem9AJC11SMyvOolP',
    icon: <LayoutDashboard className="w-6 h-6" />,
    description: 'Main workspace for general tasks and coordination.',
    color: 'bg-indigo-500',
  },
  {
    id: 'stock-rater',
    title: 'Stock Rater',
    url: 'https://opal.google/app/1UuPap2q5D1dledupAbGZq3hlm77oKvyJ',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Analyze and rate stock market opportunities.',
    color: 'bg-emerald-500',
  },
  {
    id: 'exec-coach',
    title: 'Executive Presence Coach',
    url: 'https://opal.google/app/1_udAqCvqxnUwjiLwoeUGCENUT44IkiHI',
    icon: <UserCheck className="w-6 h-6" />,
    description: 'Personalized coaching for leadership and presence.',
    color: 'bg-amber-500',
  },
  {
    id: 'pm-finder',
    title: 'PM Job Finder',
    url: 'https://opal.google/app/1L5Qo4QqFO-BIseQARw0DWw_RekA74cpa',
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Curated Product Management job opportunities.',
    color: 'bg-blue-500',
  },
  {
    id: 'product-research',
    title: 'Product Research',
    url: 'https://opal.google/app/1VmdthzNc1B9AQtJBtU2alTtpxrDL-JB1',
    icon: <Search className="w-6 h-6" />,
    description: 'Deep dive research tools for product discovery.',
    color: 'bg-rose-500',
  },
];

export default function App() {
  const [apps, setApps] = useState<MiniApp[]>(INITIAL_APPS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedApps = localStorage.getItem('mini_apps_dashboard');
    if (savedApps) {
      try {
        const parsed = JSON.parse(savedApps);
        // Map icons back if they were serialized (though icons are JSX, so we handle them carefully)
        // For simplicity in this demo, we'll just use a default icon for user-added apps
        // but keep the initial ones as they are.
        const merged = INITIAL_APPS.map(initial => {
          const saved = parsed.find((p: any) => p.id === initial.id);
          return saved ? { ...initial, ...saved, icon: initial.icon } : initial;
        });
        
        // Add apps that are in saved but not in initial
        const userAdded = parsed.filter((p: any) => !INITIAL_APPS.find(i => i.id === p.id))
          .map((p: any) => ({
            ...p,
            icon: <Globe className="w-6 h-6" /> // Default icon for user added
          }));
          
        setApps([...merged, ...userAdded]);
      } catch (e) {
        console.error("Failed to parse saved apps", e);
      }
    }
  }, []);

  // Save to localStorage when apps change
  useEffect(() => {
    // We only save the data, not the JSX icons
    const dataToSave = apps.map(({ icon, ...rest }) => rest);
    localStorage.setItem('mini_apps_dashboard', JSON.stringify(dataToSave));
  }, [apps]);

  const openApp = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newUrl) return;

    const newApp: MiniApp = {
      id: `user-app-${Date.now()}`,
      title: newName,
      url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
      icon: <Globe className="w-6 h-6" />,
      description: 'Custom added mini-app.',
      color: 'bg-zinc-600',
    };

    setApps([...apps, newApp]);
    setNewName('');
    setNewUrl('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">MiniApp Hub</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-xs font-medium">
                TR
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-zinc-900 mb-2"
            >
              Welcome back, Tejas
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500"
            >
              Access your personal suite of Opal mini-apps from one place.
            </motion.p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Add New App
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => openApp(app.url)}
              id={`app-card-${app.id}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${app.color} text-white shadow-lg shadow-current/20`}>
                  {app.icon}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-zinc-400" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {app.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6 line-clamp-2">
                {app.description}
              </p>
              
              <div className="flex items-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Ready to launch
                </span>
              </div>
            </motion.div>
          ))}

          {/* Add New Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: apps.length * 0.05 }}
            onClick={() => setIsModalOpen(true)}
            className="group relative bg-zinc-100/50 rounded-2xl border-2 border-dashed border-zinc-200 p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-100 hover:border-zinc-300 transition-all cursor-pointer"
          >
            <div className="p-3 rounded-full bg-white border border-zinc-200 text-zinc-400 mb-3 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-all">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors">Add new app</span>
          </motion.div>
        </div>

        {/* Footer Stats/Info */}
        <div className="mt-16 pt-8 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">Total Apps</p>
            <p className="text-2xl font-bold text-zinc-900">{apps.length}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">Platform</p>
            <p className="text-2xl font-bold text-zinc-900">Opal.google</p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">Last Sync</p>
            <p className="text-2xl font-bold text-zinc-900">Just now</p>
          </div>
        </div>
      </main>

      {/* Add App Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-zinc-200 w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-zinc-900">Add New Mini-App</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              
              <form onSubmit={handleAddApp} className="p-6 space-y-4">
                <div>
                  <label htmlFor="appName" className="block text-sm font-medium text-zinc-700 mb-1">
                    App Name
                  </label>
                  <input
                    type="text"
                    id="appName"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. My Custom Tool"
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="appUrl" className="block text-sm font-medium text-zinc-700 mb-1">
                    App URL
                  </label>
                  <input
                    type="text"
                    id="appUrl"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="opal.google/app/..."
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                  >
                    Add to Dashboard
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
