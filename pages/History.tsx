
import React, { useState } from 'react';
import { useApp } from '../App.tsx';

const History: React.FC = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filter === 'All' || tx.type === filter;
    const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto pb-32 p-6 bg-slate-50 dark:bg-slate-900">
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
        {['All', 'SENT', 'RECEIVED', 'BILL'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              filter === cat 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105' 
              : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative mb-8">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input
          type="text"
          placeholder="Search by name or service..."
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none shadow-sm text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(tx => (
            <div key={tx.id} className="group cursor-pointer bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all active:scale-98">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'RECEIVED' ? 'bg-green-100 text-green-600' : 'bg-slate-50 dark:bg-slate-700 text-slate-600'}`}>
                    <i className={`fa-solid ${tx.type === 'RECEIVED' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{tx.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{tx.date} • {tx.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'RECEIVED' ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                    {tx.type === 'RECEIVED' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                  <button className="text-[9px] text-blue-600 font-black uppercase tracking-widest hover:underline mt-1">Receipt</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 opacity-30">
            <i className="fa-solid fa-receipt text-6xl mb-4 block"></i>
            <p className="font-bold">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
