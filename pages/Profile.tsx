
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const Profile: React.FC = () => {
  const { user, isDarkMode, toggleDarkMode, logout, bankAccounts } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto pb-24 p-6">
      <div className="flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <img src={user.avatar} className="w-24 h-24 rounded-[30px] shadow-xl border-4 border-white" alt="Avatar" />
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <i className="fa-solid fa-camera"></i>
          </button>
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-slate-500 text-sm font-medium">{user.upiId}</p>
      </div>

      <div className="space-y-6">
        {user.isAdmin && (
          <section>
            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Administration</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl overflow-hidden border border-blue-100 dark:border-blue-800 shadow-sm">
              <ProfileOption 
                icon="fa-gauge-high" 
                label="Admin Dashboard" 
                onClick={() => navigate('/admin')}
              />
            </div>
          </section>
        )}

        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Settings</h3>
          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
            <ProfileOption icon="fa-moon" label="Dark Mode" onClick={toggleDarkMode}>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </ProfileOption>
            <ProfileOption icon="fa-fingerprint" label="Biometric Lock" />
            <ProfileOption icon="fa-shield-halved" label="Privacy Settings" />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Account</h3>
          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
            <ProfileOption icon="fa-building-columns" label="Linked Banks" badge={bankAccounts.length.toString()} />
            <ProfileOption icon="fa-address-card" label="Edit Profile" />
            <ProfileOption icon="fa-circle-question" label="Help & Support" />
          </div>
        </section>

        <button 
          onClick={logout}
          className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2 active:bg-red-100 transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

const ProfileOption: React.FC<{ icon: string; label: string; onClick?: () => void; badge?: string; children?: React.ReactNode }> = ({ icon, label, onClick, badge, children }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <span className="font-bold text-slate-700 dark:text-slate-200">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full">{badge}</span>}
      {children || <i className="fa-solid fa-chevron-right text-slate-300 text-sm"></i>}
    </div>
  </button>
);

export default Profile;
