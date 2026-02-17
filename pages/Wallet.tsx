
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App.tsx';
import { TransactionType, TransactionStatus } from '../types.ts';

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { walletBalance, setWalletBalance, addTransaction } = useApp();
  const [addAmount, setAddAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMoney = () => {
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) return;

    setIsLoading(true);
    setTimeout(() => {
      setWalletBalance(prev => prev + amt);
      addTransaction({
        id: `KYAN-WLT-${Math.floor(1000 + Math.random() * 9000)}`,
        title: 'Kyan-Wallet Credit',
        amount: amt,
        date: new Date().toISOString().split('T')[0],
        type: TransactionType.RECEIVED,
        status: TransactionStatus.SUCCESS,
        category: 'Wallet'
      });
      setIsLoading(false);
      setAddAmount('');
      alert(`₹${amt} deposited successfully into your KyanPay Wallet!`);
    }, 1500);
  };

  return (
    <div className="flex-1 p-6 flex flex-col bg-slate-50 dark:bg-slate-900">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center">
          <i className="fa-solid fa-arrow-left text-slate-400"></i>
        </button>
        <h2 className="text-xl font-bold">Kyan Vault</h2>
      </div>

      <div className="bg-gradient-to-br from-cyan-700 to-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <p className="text-cyan-100 text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Available Liquidity</p>
            <h3 className="text-4xl font-black">₹{walletBalance.toLocaleString('en-IN')}</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
            <i className="fa-solid fa-shield-halved text-2xl"></i>
          </div>
        </div>
        <div className="flex gap-3 relative z-10">
          <span className="bg-white/20 text-white text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-widest border border-white/20">Verified Asset</span>
          <span className="bg-white/20 text-white text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-widest border border-white/20">KyanFlow</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex-1">
        <h4 className="font-bold mb-4 text-sm text-slate-500 uppercase tracking-widest">Inject Funds</h4>
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-300">₹</span>
            <input
              type="number"
              placeholder="Amount"
              className="w-full pl-10 pr-4 py-4 bg-slate-50 dark:bg-slate-700 rounded-2xl border-none focus:ring-2 focus:ring-cyan-500 outline-none font-bold text-lg"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[500, 1000, 5000].map(val => (
              <button
                key={val}
                onClick={() => setAddAmount(val.toString())}
                className="py-2.5 bg-slate-50 dark:bg-slate-700 rounded-xl text-xs font-bold hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
              >
                +₹{val}
              </button>
            ))}
          </div>

          <button
            onClick={handleAddMoney}
            disabled={isLoading || !addAmount}
            className="w-full py-4 bg-cyan-600 text-white rounded-2xl font-bold shadow-lg shadow-cyan-100 disabled:opacity-50 mt-4 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                Processing Transaction...
              </>
            ) : 'Deposit Funds'}
          </button>
        </div>

        <div className="mt-12 space-y-4">
          <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-[0.2em]">System Benefits</h4>
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
            <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <div>
              <p className="text-sm font-bold">Hyper Settlement</p>
              <p className="text-[10px] text-slate-400">Zero-latency fund availability.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-fingerprint"></i>
            </div>
            <div>
              <p className="text-sm font-bold">Bio-Locked Vault</p>
              <p className="text-[10px] text-slate-400">Each credit requires biometric confirmation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;