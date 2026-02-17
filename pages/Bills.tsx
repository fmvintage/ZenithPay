
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bills: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Mobile Recharge', icon: 'fa-mobile-screen', color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Electricity', icon: 'fa-lightbulb', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'DTH / TV', icon: 'fa-tv', color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Broadband', icon: 'fa-wifi', color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Water Bill', icon: 'fa-droplet', color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { name: 'Piped Gas', icon: 'fa-gas-pump', color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Fastag', icon: 'fa-road', color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Insurance', icon: 'fa-shield-heart', color: 'text-pink-600', bg: 'bg-pink-100' },
  ];

  return (
    <div className="flex-1 p-6 flex flex-col bg-slate-50 dark:bg-slate-900">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-xl font-bold">Bills & Services</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <button 
            key={i}
            onClick={() => alert(`Connecting to live ${cat.name} gateway...`)}
            className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cat.bg} ${cat.color}`}>
              <i className={`fa-solid ${cat.icon} text-lg`}></i>
            </div>
            <span className="text-[10px] font-bold text-center leading-tight">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 bg-blue-600 p-6 rounded-[32px] text-white relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-bold mb-1">Upcoming Bills</h4>
          <p className="text-xs text-blue-100 mb-4">You have 0 pending bills this week.</p>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-400"></div>)}
          </div>
        </div>
        <i className="fa-solid fa-bell absolute -right-4 -bottom-4 text-7xl text-white/10 rotate-12"></i>
      </div>
    </div>
  );
};

export default Bills;
