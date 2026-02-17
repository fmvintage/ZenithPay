
import React, { useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import History from './pages/History.tsx';
import Profile from './pages/Profile.tsx';
import Rewards from './pages/Rewards.tsx';
import SendMoney from './pages/SendMoney.tsx';
import ScanPay from './pages/ScanPay.tsx';
import Wallet from './pages/Wallet.tsx';
import Admin from './pages/Admin.tsx';
import Bills from './pages/Bills.tsx';
import AddBank from './pages/AddBank.tsx';
import { MOCK_USER, MOCK_TRANSACTIONS } from './constants.tsx';
import { Transaction, BankAccount, UserProfile } from './types.ts';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  balance: number;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  transactions: Transaction[];
  bankAccounts: BankAccount[];
  setBankAccounts: React.Dispatch<React.SetStateAction<BankAccount[]>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
  addTransaction: (t: Transaction) => void;
  isBankLinked: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(500.00);
  
  const isBankLinked = bankAccounts.length > 0;
  const balance = bankAccounts.reduce((acc, curr) => acc + curr.balance, 0) + walletBalance;

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  
  const login = (name: string) => {
    setUser(prev => ({ ...prev, name }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setBankAccounts([]);
  };
  
  const addTransaction = (t: Transaction) => {
    setTransactions(prev => [t, ...prev]);
    if (isBankLinked) {
      setBankAccounts(prev => prev.map(bank => 
        bank.isPrimary ? { ...bank, balance: bank.balance - t.amount } : bank
      ));
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      balance,
      walletBalance,
      setWalletBalance,
      transactions,
      bankAccounts,
      setBankAccounts,
      isDarkMode,
      toggleDarkMode,
      isAuthenticated,
      login,
      logout,
      addTransaction,
      isBankLinked
    }}>
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Router>
            <div className="max-w-md mx-auto relative min-h-screen shadow-2xl bg-white dark:bg-slate-800 flex flex-col overflow-hidden">
              <Routes>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/login" />} />
                <Route path="/rewards" element={isAuthenticated ? <Rewards /> : <Navigate to="/login" />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/send" element={isAuthenticated ? <SendMoney /> : <Navigate to="/login" />} />
                <Route path="/scan" element={isAuthenticated ? <ScanPay /> : <Navigate to="/login" />} />
                <Route path="/wallet" element={isAuthenticated ? <Wallet /> : <Navigate to="/login" />} />
                <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
                <Route path="/bills" element={isAuthenticated ? <Bills /> : <Navigate to="/login" />} />
                <Route path="/add-bank" element={isAuthenticated ? <AddBank /> : <Navigate to="/login" />} />
              </Routes>
              {isAuthenticated && <BottomNav />}
            </div>
          </Router>
        </div>
      </div>
    </AppContext.Provider>
  );
};

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItemsLeft = [
    { icon: 'fa-house', label: 'Home', path: '/' },
    { icon: 'fa-receipt', label: 'History', path: '/history' },
  ];

  const navItemsRight = [
    { icon: 'fa-gift', label: 'Rewards', path: '/rewards' },
    { icon: 'fa-user', label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 max-w-md w-full z-50">
      <div className="absolute left-1/2 -top-8 -translate-x-1/2 flex flex-col items-center">
        <button 
          onClick={() => navigate('/scan')}
          className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-300 border-4 border-white dark:border-slate-800 hover:scale-110 active:scale-90 transition-transform"
        >
          <i className="fa-solid fa-qrcode text-2xl"></i>
        </button>
      </div>

      <nav className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-700 flex justify-between items-center py-2 pb-6 px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-10">
          {navItemsLeft.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}`}
              >
                <i className={`fa-solid ${item.icon} text-lg`}></i>
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="flex gap-10">
          {navItemsRight.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}`}
              >
                <i className={`fa-solid ${item.icon} text-lg`}></i>
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default App;
