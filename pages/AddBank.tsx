
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App.tsx';

const INDIAN_BANKS = [
  { name: 'State Bank of India', code: 'SBI', logo: 'S' },
  { name: 'HDFC Bank', code: 'HDFC', logo: 'H' },
  { name: 'ICICI Bank', code: 'ICICI', logo: 'I' },
  { name: 'Axis Bank', code: 'AXIS', logo: 'A' },
  { name: 'Kotak Mahindra Bank', code: 'KOTAK', logo: 'K' },
  { name: 'Punjab National Bank', code: 'PNB', logo: 'P' },
  { name: 'Bank of Baroda', code: 'BOB', logo: 'B' },
  { name: 'Canara Bank', code: 'CANARA', logo: 'C' },
  { name: 'Union Bank of India', code: 'UBI', logo: 'U' },
  { name: 'Indian Bank', code: 'IND', logo: 'I' },
];

const AddBank: React.FC = () => {
  const navigate = useNavigate();
  const { setBankAccounts } = useApp();
  const [search, setSearch] = useState('');

  const filteredBanks = INDIAN_BANKS.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBank = (bank: typeof INDIAN_BANKS[0]) => {
    // Simulate linking live bank account
    const confirmLink = confirm(`Confirm linking your ${bank.name} account?`);
    if (confirmLink) {
      const newAccount = {
        id: Math.random().toString(),
        bankName: bank.name,
        accountNumber: '**** ' + Math.floor(1000 + Math.random() * 9000),
        isPrimary: true,
        balance: 25000.00, // Mock initial balance
        logo: `https://picsum.photos/seed/${bank.code}/100`
      };
      setBankAccounts([newAccount]);
      alert(`Success! Your ${bank.name} account is now linked securely.`);
      navigate('/');
    }
  };

  return (
    <div className="flex-1 p-6 flex flex-col bg-slate-50 dark:bg-slate-900">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-xl font-bold">Select Bank</h2>
      </div>

      <div className="relative mb-8">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input
          type="text"
          placeholder="Search your bank..."
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none shadow-sm text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-3">
          {filteredBanks.map((bank, i) => (
            <button
              key={i}
              onClick={() => handleSelectBank(bank)}
              className="w-full p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:border-blue-500 transition-all active:scale-98"
            >
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg shadow-inner">
                {bank.logo}
              </div>
              <div className="text-left">
                <h5 className="font-bold text-sm text-slate-700 dark:text-slate-200">{bank.name}</h5>
                <p className="text-[10px] text-slate-400 font-medium">Automatic SIM Verification</p>
              </div>
              <i className="fa-solid fa-chevron-right ml-auto text-slate-300 text-xs"></i>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddBank;
