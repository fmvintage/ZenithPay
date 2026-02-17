
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App.tsx';
import { MOCK_TICKETS } from '../constants.tsx';

const ADMIN_PASSWORD = '245424';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { transactions } = useApp();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'support'>('stats');

  const handlePinEntry = (digit: string) => {
    setError(false);
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 6) {
        if (newPin === ADMIN_PASSWORD) {
          setIsAuthorized(true);
        } else {
          setError(true);
          setTimeout(() => setPin(''), 1000);
        }
      }
    }
  };

  const clearPin = () => {
    setPin('');
    setError(false);
  };

  if (!isAuthorized) {
    return (
      <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center p-8 text-white">
        <div className="mb-12 text-center">
          <div className="w-20 h-20 bg-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(8,145,178,0.3)] border border-cyan-400/30">
            <i className="fa-solid fa-terminal text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">KyanPay HQ</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Central Security Access</p>
        </div>

        <div className="flex gap-3 mb-12">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                i < pin.length 
                  ? 'bg-cyan-500 border-cyan-500 scale-125 shadow-[0_0_15px_rgba(6,182,212,0.8)]' 
                  : 'border-slate-800'
              } ${error ? 'bg-red-500 border-red-500 animate-shake' : ''}`}
            ></div>
          ))}
        </div>

        {error && <p className="text-red-500 text-[10px] font-black mb-8 animate-bounce uppercase tracking-[0.2em]">Node Access Rejected</p>}

        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '←'].map((key, i) => (
            <button
              key={i}
              onClick={() => {
                if (key === 'C') clearPin();
                else if (key === '←') setPin(prev => prev.slice(0, -1));
                else handlePinEntry(key.toString());
              }}
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/5 active:bg-cyan-600 transition-all border border-white/5 active:scale-90"
            >
              {key}
            </button>
          ))}
        </div>

        <button 
          onClick={() => navigate('/profile')}
          className="mt-12 text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white transition-colors"
        >
          Terminate Session
        </button>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.2s ease-in-out 0s 2;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-slate-50 dark:bg-slate-900">
      <div className="p-6 bg-slate-950 text-white rounded-b-[3rem] shadow-xl sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <i className="fa-solid fa-arrow-left text-slate-500"></i>
            </button>
            <h2 className="text-xl font-bold">Kyan Command Center</h2>
          </div>
          <button 
            onClick={() => setIsAuthorized(false)} 
            className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20"
          >
            <i className="fa-solid fa-door-closed"></i>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <TabButton active={activeTab === 'stats'} icon="fa-chart-network" label="Metrics" onClick={() => setActiveTab('stats')} />
          <TabButton active={activeTab === 'users'} icon="fa-fingerprint" label="Nodes" onClick={() => setActiveTab('users')} />
          <TabButton active={activeTab === 'support'} icon="fa-headset" label="Support" onClick={() => setActiveTab('support')} />
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Global Users" value="8,450" color="text-cyan-600" />
              <StatCard label="Priority Logs" value={MOCK_TICKETS.length.toString()} color="text-orange-500" />
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
              <h4 className="font-black text-[10px] uppercase tracking-widest mb-4 text-slate-400">Throughput Analysis</h4>
              <div className="flex items-end gap-2 h-32 mb-4">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-cyan-100 dark:bg-cyan-900/20 rounded-t-lg transition-all hover:bg-cyan-500" style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between text-[8px] text-slate-400 font-black uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
        )}
        {activeTab !== 'stats' && <div className="text-center py-20 opacity-30 font-black uppercase tracking-[0.3em] text-[10px]">Loading Module...</div>}
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
      active ? 'bg-white text-slate-900 shadow-xl scale-105' : 'bg-white/5 text-slate-500'
    }`}
  >
    <i className={`fa-solid ${icon}`}></i>
    {label}
  </button>
);

const StatCard: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="bg-white dark:bg-slate-800 p-5 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm">
    <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest mb-1">{label}</p>
    <h3 className={`text-2xl font-black ${color}`}>{value}</h3>
  </div>
);

export default Admin;