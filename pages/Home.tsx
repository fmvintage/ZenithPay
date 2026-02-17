
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

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="p-6 bg-cyan-600 text-white rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-cyan-500 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-700 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={user.avatar} className="w-11 h-11 rounded-2xl border-2 border-white/30 p-0.5 shadow-lg" alt="Avatar" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-cyan-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-[10px] text-cyan-100 font-bold uppercase tracking-widest opacity-80">Connected</p>
                <h3 className="font-black text-lg">{user.name || 'Citizen'}</h3>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="relative w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-md">
                <i className="fa-solid fa-bell text-sm"></i>
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-400 rounded-full"></span>
              </button>
              <button onClick={() => navigate('/profile')} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-md">
                <i className="fa-solid fa-layer-group text-sm"></i>
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-xs text-cyan-100 mb-2 flex items-center justify-center gap-2 font-bold uppercase tracking-[0.2em] opacity-80">
              Nexus Balance
              <button onClick={() => setShowBalance(!showBalance)} className="text-white/60 hover:text-white transition-colors">
                <i className={`fa-solid ${showBalance ? 'fa-eye-slash' : 'fa-eye'} text-[10px]`}></i>
              </button>
            </p>
            {isBankLinked ? (
              <h2 className="text-5xl font-black tracking-tight drop-shadow-sm">
                {showBalance ? `₹${balance.toLocaleString('en-IN')}` : '••••••'}
              </h2>
            ) : (
              <div className="mt-4">
                <button 
                  onClick={() => navigate('/add-bank')}
                  className="bg-white text-cyan-700 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-cyan-900/20 active:scale-95 transition-all"
                >
                  Link Node
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4 mt-12 mb-4">
            <ActionButton icon="fa-paper-plane" label="Transmit" onClick={() => navigate('/send')} />
            <ActionButton icon="fa-vault" label="Vault" onClick={() => navigate('/wallet')} />
            <ActionButton icon="fa-link" label="Nodes" onClick={() => navigate('/add-bank')} />
            <ActionButton icon="fa-microchip" label="Insights" onClick={askAssistant} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-10 p-5 bg-gradient-to-br from-cyan-50 to-white dark:from-slate-800 dark:to-slate-800/50 rounded-[2rem] border border-cyan-100/50 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-cyan-600 text-white rounded-lg flex items-center justify-center text-xs shadow-lg shadow-cyan-200">
              <i className="fa-solid fa-sparkles"></i>
            </div>
            <h4 className="font-black text-xs text-cyan-900 dark:text-cyan-100 uppercase tracking-widest">Kyan Smart AI</h4>
          </div>
          <div className="min-h-[60px]">
            {isAskingAi ? (
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce delay-150"></div>
              </div>
            ) : aiResponse ? (
              <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">{aiResponse}</div>
            ) : (
              <p className="text-[11px] text-slate-400 font-medium italic">Ready to analyze your economy. Tap Insights above.</p>
            )}
          </div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Recent Transmissions</h3>
            <button onClick={() => navigate('/history')} className="text-[10px] font-black text-cyan-600 uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-50 dark:border-slate-700 shadow-sm active:scale-98 transition-transform">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${tx.type === 'RECEIVED' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'} dark:bg-slate-700`}>
                    <i className={`fa-solid ${tx.type === 'RECEIVED' ? 'fa-arrow-down-left' : 'fa-arrow-up-right'}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">{tx.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-black text-sm ${tx.type === 'RECEIVED' ? 'text-green-600' : 'text-slate-800 dark:text-white'}`}>
                  {tx.type === 'RECEIVED' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-3 group">
    <div className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-lg transition-all active:scale-90">
      <i className={`fa-solid ${icon} text-lg`}></i>
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest opacity-90">{label}</span>
  </button>
);

export default Home;