
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

  // Authorization Screen
  if (!isAuthorized) {
    return (
      <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-8 text-white">
        <div className="mb-12 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/20">
            <i className="fa-solid fa-shield-halved text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold">ZenithPay Admin</h2>
          <p className="text-slate-400 text-sm mt-2">Enter Secure Admin Access PIN</p>
        </div>

        <div className="flex gap-3 mb-12">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                i < pin.length 
                  ? 'bg-blue-500 border-blue-500 scale-125' 
                  : 'border-slate-700'
              } ${error ? 'bg-red-500 border-red-500 animate-shake' : ''}`}
            ></div>
          ))}
        </div>

        {error && <p className="text-red-500 text-xs font-bold mb-8 animate-bounce uppercase tracking-widest">Access Denied</p>}

        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '←'].map((key, i) => (
            <button
              key={i}
              onClick={() => {
                if (key === 'C') clearPin();
                else if (key === '←') setPin(prev => prev.slice(0, -1));
                else handlePinEntry(key.toString());
              }}
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold hover:bg-white/10 active:bg-blue-600 transition-all border border-white/5"
            >
              {key}
            </button>
          ))}
        </div>

        <button 
          onClick={() => navigate('/profile')}
          className="mt-12 text-slate-500 text-sm font-bold hover:text-white"
        >
          Cancel Access
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

  // Admin Dashboard (Authorized)
  const totalUsers = 1240;
  const activeTickets = MOCK_TICKETS.filter(t => t.status !== 'CLOSED').length;

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="p-6 bg-slate-900 text-white rounded-b-[40px] shadow-xl sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h2 className="text-xl font-bold">ZenithPay Admin Panel</h2>
          </div>
          <button 
            onClick={() => setIsAuthorized(false)} 
            className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/30"
            title="Lock Panel"
          >
            <i className="fa-solid fa-lock"></i>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <TabButton 
            active={activeTab === 'stats'} 
            icon="fa-chart-line" 
            label="Overview" 
            onClick={() => setActiveTab('stats')} 
          />
          <TabButton 
            active={activeTab === 'users'} 
            icon="fa-users" 
            label="Customers" 
            onClick={() => setActiveTab('users')} 
          />
          <TabButton 
            active={activeTab === 'support'} 
            icon="fa-headset" 
            label="Live Support" 
            onClick={() => setActiveTab('support')} 
          />
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Total Users" value={totalUsers.toLocaleString()} color="text-blue-600" />
              <StatCard label="Live Tickets" value={activeTickets.toString()} color="text-orange-600" />
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold mb-4 text-slate-700 dark:text-slate-200">Transaction Volume</h4>
              <div className="flex items-end gap-2 h-32 mb-4">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t-lg transition-all hover:bg-blue-500" style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold mb-4 text-slate-700 dark:text-slate-200">System Health</h4>
              <div className="space-y-4">
                <HealthItem label="Payment Gateway" status="Operational" color="bg-green-500" />
                <HealthItem label="SMS Gateway" status="Degraded" color="bg-yellow-500" />
                <HealthItem label="Database" status="Operational" color="bg-green-500" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="relative mb-6">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none shadow-sm text-sm"
              />
            </div>
            
            {[
              { name: 'Rajesh Kumar', phone: '+91 98XXX 12345', balance: '₹12,450', kyc: 'Verified' },
              { name: 'Anjali Sharma', phone: '+91 87XXX 99887', balance: '₹4,200', kyc: 'Pending' },
              { name: 'Suresh Patil', phone: '+91 91XXX 00112', balance: '₹890', kyc: 'Verified' },
              { name: 'Megha Gupta', phone: '+91 76XXX 44332', balance: '₹1,00,450', kyc: 'Verified' },
            ].map((cust, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-2xl flex items-center justify-between border border-slate-50 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-slate-500">
                    {cust.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-700 dark:text-slate-200">{cust.name}</h5>
                    <p className="text-xs text-slate-400">{cust.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-800 dark:text-white">{cust.balance}</p>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${cust.kyc === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {cust.kyc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest">Active Tickets</h4>
              <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">Live</span>
            </div>
            
            {MOCK_TICKETS.map(ticket => (
              <div key={ticket.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-slate-400">{ticket.id}</span>
                      <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold ${
                        ticket.priority === 'HIGH' ? 'bg-red-100 text-red-600' : 
                        ticket.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">{ticket.subject}</h5>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{ticket.timestamp}</span>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                    <span className="text-xs font-bold text-slate-500">{ticket.userName}</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-700 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            ))}
            
            <div className="bg-indigo-600 p-6 rounded-3xl text-white mt-8 shadow-lg shadow-indigo-200 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold mb-2">24/7 ZenithPay Support</h4>
                <p className="text-xs text-indigo-100 mb-4">Agents are online and responding live.</p>
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold text-xs">Join Queue</button>
              </div>
              <i className="fa-solid fa-headset absolute -right-4 -bottom-4 text-7xl text-white/10 rotate-12"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
      active ? 'bg-white text-slate-900 shadow-lg scale-105' : 'bg-white/10 text-white/60'
    }`}
  >
    <i className={`fa-solid ${icon}`}></i>
    {label}
  </button>
);

const StatCard: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
    <h3 className={`text-2xl font-black ${color}`}>{value}</h3>
  </div>
);

const HealthItem: React.FC<{ label: string; status: string; color: string }> = ({ label, status, color }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`}></span>
      <span className="text-xs font-bold text-slate-500">{status}</span>
    </div>
  </div>
);

export default Admin;
