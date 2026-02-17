
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App.tsx';
import { getFinancialAdvice } from '../services/geminiService.ts';

const Home: React.FC = () => {
  const { user, balance, transactions, isBankLinked } = useApp();
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAskingAi, setIsAskingAi] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const askAssistant = async () => {
    setIsAskingAi(true);
    const response = await getFinancialAdvice(transactions, "Analyze my recent transactions and give me a quick spending summary in INR.");
    setAiResponse(response);
    setIsAskingAi(false);
  };
// ... rest of the file remains same, keeping it full content as requested by system instructions
  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="p-6 bg-blue-600 text-white rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-700 rounded-full blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white/50" alt="Avatar" />
              <div>
                <p className="text-xs text-blue-100">Welcome,</p>
                <h3 className="font-bold">{user.name || 'User'}</h3>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-bell"></i>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-blue-600"></span>
              </button>
              <button onClick={() => navigate('/profile')} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          </div>
          <div className="text-center mb-6">
            <p className="text-sm text-blue-100 mb-1 flex items-center justify-center gap-2">
              Available Balance
              <button onClick={() => setShowBalance(!showBalance)} className="text-blue-200">
                <i className={`fa-solid ${showBalance ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
              </button>
            </p>
            {isBankLinked ? (
              <h2 className="text-4xl font-bold">
                {showBalance ? `₹${balance.toLocaleString('en-IN')}` : '••••••'}
              </h2>
            ) : (
              <div className="mt-2">
                <button 
                  onClick={() => navigate('/add-bank')}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-2xl text-sm font-bold border border-white/30 transition-all"
                >
                  Link Bank Account
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-8">
            <button onClick={() => navigate('/send')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10"><i className="fa-solid fa-paper-plane"></i></div>
              <span className="text-xs">Send</span>
            </button>
            <button onClick={() => navigate('/wallet')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10"><i className="fa-solid fa-wallet"></i></div>
              <span className="text-xs">Wallet</span>
            </button>
            <button onClick={() => navigate('/add-bank')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10"><i className="fa-solid fa-building-columns"></i></div>
              <span className="text-xs">Bank</span>
            </button>
            <button onClick={askAssistant} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10"><i className="fa-solid fa-chart-pie"></i></div>
              <span className="text-xs">Insights</span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-8 p-4 bg-indigo-50 dark:bg-slate-700/50 rounded-3xl border border-indigo-100 dark:border-slate-700 shadow-inner">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-wand-magic-sparkles text-indigo-600"></i>
            <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200">Smart Finance AI</h4>
          </div>
          {isAskingAi ? <p className="text-xs animate-pulse">Analyzing...</p> : aiResponse ? <div className="text-xs leading-relaxed">{aiResponse}</div> : <p className="text-xs opacity-60">Analyze your spending with AI.</p>}
        </div>
        <section className="mb-8">
          <h3 className="font-bold text-lg mb-4">Live Activity</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-700/50 rounded-2xl border border-slate-50 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"><i className="fa-solid fa-arrow-right"></i></div>
                  <div><h4 className="font-bold text-sm">{tx.title}</h4><p className="text-[10px] opacity-50">{tx.date}</p></div>
                </div>
                <p className="font-bold">₹{tx.amount}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
