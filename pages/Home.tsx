
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { getFinancialAdvice } from '../services/geminiService';

const Home: React.FC = () => {
  const { user, balance, transactions, isDarkMode, isBankLinked } = useApp();
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
      {/* Header */}
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
                <p className="text-[10px] text-blue-100 mt-2 opacity-70 italic">Link bank account to see live balance</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4 mt-8">
            <QuickAction icon="fa-paper-plane" label="Send" onClick={() => navigate('/send')} />
            <QuickAction icon="fa-wallet" label="Wallet" onClick={() => navigate('/wallet')} />
            <QuickAction icon="fa-building-columns" label="Bank" onClick={() => navigate('/add-bank')} />
            <QuickAction icon="fa-chart-pie" label="Insights" onClick={askAssistant} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Gemini Assistant */}
        <div className="mb-8 p-4 bg-indigo-50 dark:bg-slate-700/50 rounded-3xl border border-indigo-100 dark:border-slate-700 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-wand-magic-sparkles text-white text-sm"></i>
              </div>
              <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200">Smart Finance AI</h4>
            </div>
          </div>
          
          {isAskingAi ? (
            <div className="flex items-center gap-2 animate-pulse py-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
              <span className="text-xs text-indigo-400 font-medium">Fetching live insights...</span>
            </div>
          ) : aiResponse ? (
            <div className="text-xs text-indigo-800 dark:text-indigo-200 leading-relaxed bg-white/50 dark:bg-slate-800/50 p-3 rounded-xl border border-indigo-100 dark:border-slate-700">
              {aiResponse}
              <button 
                onClick={() => setAiResponse(null)}
                className="block mt-2 text-indigo-600 dark:text-indigo-400 font-bold"
              >
                Clear
              </button>
            </div>
          ) : (
            <p className="text-xs text-indigo-600/70 dark:text-indigo-300/70">Securely analyze your spending patterns using AI.</p>
          )}
        </div>

        {/* Bills & Recharge */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Bills & Recharges</h3>
            <button onClick={() => navigate('/bills')} className="text-sm text-blue-600 font-semibold">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <ServiceItem icon="fa-mobile-screen" label="Mobile" color="bg-orange-100 text-orange-600" onClick={() => navigate('/bills')} />
            <ServiceItem icon="fa-lightbulb" label="Electricity" color="bg-yellow-100 text-yellow-600" onClick={() => navigate('/bills')} />
            <ServiceItem icon="fa-wifi" label="Broadband" color="bg-blue-100 text-blue-600" onClick={() => navigate('/bills')} />
            <ServiceItem icon="fa-gas-pump" label="Gas" color="bg-red-100 text-red-600" onClick={() => navigate('/bills')} />
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Live Activity</h3>
            <button onClick={() => navigate('/history')} className="text-sm text-blue-600 font-semibold">Full History</button>
          </div>
          <div className="space-y-4">
            {transactions.slice(0, 5).map(tx => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ icon: string; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform border border-white/10">
      <i className={`fa-solid ${icon} text-xl`}></i>
    </div>
    <span className="text-xs font-medium text-blue-50">{label}</span>
  </button>
);

const ServiceItem: React.FC<{ icon: string; label: string; color: string; onClick?: () => void }> = ({ icon, label, color, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-sm group-active:scale-95 transition-transform`}>
      <i className={`fa-solid ${icon} text-xl`}></i>
    </div>
    <span className="text-[10px] font-semibold text-slate-500 text-center leading-tight">{label}</span>
  </button>
);

const TransactionRow: React.FC<{ tx: any }> = ({ tx }) => {
  const isReceived = tx.type === 'RECEIVED';
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-700/50 rounded-2xl border border-slate-50 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isReceived ? 'bg-green-100 text-green-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
          <i className={`fa-solid ${isReceived ? 'fa-arrow-down' : 'fa-bag-shopping'}`}></i>
        </div>
        <div>
          <h4 className="font-bold text-sm">{tx.title}</h4>
          <p className="text-[10px] text-slate-400">{tx.date} • {tx.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${isReceived ? 'text-green-600' : 'text-slate-800 dark:text-white'}`}>
          {isReceived ? '+' : '-'}₹{tx.amount.toFixed(2)}
        </p>
        <span className={`text-[8px] uppercase font-bold tracking-wider ${tx.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}`}>
          {tx.status}
        </span>
      </div>
    </div>
  );
}

export default Home;
