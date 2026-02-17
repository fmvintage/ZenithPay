
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { TransactionType, TransactionStatus } from '../types';

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const { walletBalance, setWalletBalance, addTransaction } = useApp();
  const [addAmount, setAddAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMoney = () => {
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) return;

    setIsLoading(true);
    // Simulate live payment processing
    setTimeout(() => {
      setWalletBalance(prev => prev + amt);
      addTransaction({
        id: `ZWAL${Math.floor(Math.random() * 1000)}`,
        title: 'Added to Wallet',
        amount: amt,
        date: new Date().toISOString().split('T')[0],
        type: TransactionType.RECEIVED,
        status: TransactionStatus.SUCCESS,
        category: 'Wallet'
      });
      setIsLoading(false);
      setAddAmount('');
      alert(`₹${amt} added successfully to your ZenithPay Wallet!`);
    }, 1500);
  };

  return (
    <div className="flex-1 p-6 flex flex-col bg-slate-50 dark:bg-slate-900">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-xl font-bold">ZenithPay Wallet</h2>
      </div>

      <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-[32px] p-8 text-white shadow-xl mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Wallet Balance</p>
            <h3 className="text-4xl font-bold">₹{walletBalance.toLocaleString('en-IN')}</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <i className="fa-solid fa-wallet text-2xl"></i>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="bg-green-400/20 text-green-300 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Secure</span>
          <span className="bg-blue-400/20 text-blue-100 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Instant</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[32px] p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex-1">
        <h4 className="font-bold mb-4">Add Money to Wallet</h4>
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₹</span>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full pl-10 pr-4 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[100, 500, 1000].map(val => (
              <button
                key={val}
                onClick={() => setAddAmount(val.toString())}
                className="py-2 bg-slate-100 dark:bg-slate-700 rounded-xl text-sm font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                +₹{val}
              </button>
            ))}
          </div>

          <button
            onClick={handleAddMoney}
            disabled={isLoading || !addAmount}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 disabled:opacity-50 mt-4 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                Processing...
              </>
            ) : 'Add Money'}
          </button>
        </div>

        <div className="mt-12 space-y-4">
          <h4 className="font-bold text-sm text-slate-500 uppercase tracking-widest">Wallet Perks</h4>
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <div>
              <p className="text-sm font-bold">Superfast Payments</p>
              <p className="text-xs text-slate-400">One-tap checkout for all services.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-shield-check"></i>
            </div>
            <div>
              <p className="text-sm font-bold">Zero Failure Rate</p>
              <p className="text-xs text-slate-400">Wallet payments never get stuck.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
