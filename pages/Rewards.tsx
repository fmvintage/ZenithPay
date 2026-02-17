
import React from 'react';

const Rewards: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto pb-32 p-6 bg-slate-50 dark:bg-slate-900">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[40px] p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Rewards</h2>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <i className="fa-solid fa-trophy"></i>
            </div>
          </div>
          <div className="text-center">
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Total Cashback Won</p>
            <h3 className="text-5xl font-black">₹4,521.00</h3>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Scratch Cards</h3>
        <span className="text-xs font-bold text-blue-600">Won 12 times</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="aspect-square bg-white dark:bg-slate-800 rounded-[32px] p-4 shadow-sm flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700 cursor-pointer hover:scale-105 transition-all group">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform shadow-inner">
              <i className="fa-solid fa-gift text-2xl text-indigo-600"></i>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tap to Scratch</p>
          </div>
        ))}
      </div>

      <section className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
        <div className="flex gap-4 items-center relative z-10">
          <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
            <i className="fa-solid fa-user-plus text-blue-600 text-xl"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Refer & Earn ₹100</p>
            <p className="text-[10px] text-slate-400 font-medium">Get ₹100 for every friend who makes their first payment.</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-blue-100 active:scale-95 transition-all">Invite</button>
        </div>
      </section>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-3xl border border-orange-100 dark:border-orange-800/30">
          <i className="fa-solid fa-ticket text-orange-600 mb-2"></i>
          <p className="text-xs font-bold text-orange-900 dark:text-orange-200">5 Active Offers</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-3xl border border-emerald-100 dark:border-emerald-800/30">
          <i className="fa-solid fa-star text-emerald-600 mb-2"></i>
          <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">2,450 Points</p>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
