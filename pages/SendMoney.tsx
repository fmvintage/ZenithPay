
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { TransactionType, TransactionStatus } from '../types';

const SendMoney: React.FC = () => {
  const navigate = useNavigate();
  const { addTransaction } = useApp();
  const [step, setStep] = useState<'details' | 'pin' | 'success'>('details');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');
  const [showRocket, setShowRocket] = useState(true);

  const playRocketSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playLaunch = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 1);
        
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      };

      const playChime = (startTime: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, startTime); // A5
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.5);
      };

      playLaunch();
      playChime(audioCtx.currentTime + 1.1);
    } catch (e) {
      console.warn("Audio feedback failed", e);
    }
  };

  useEffect(() => {
    if (step === 'success') {
      playRocketSuccessSound();
      // After animation completes (roughly 1.5s), show the details
      const timer = setTimeout(() => {
        setShowRocket(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(amount) > 0 && recipient) setStep('pin');
  };

  const handlePinSubmit = () => {
    setStep('success');
    addTransaction({
      id: `ZENITH${Math.floor(Math.random() * 10000)}`,
      title: recipient,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      type: TransactionType.SENT,
      status: TransactionStatus.SUCCESS,
      category: 'Transfer',
      recipient,
      note
    });
  };

  if (step === 'success') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 text-center overflow-hidden">
        <style>{`
          @keyframes rocket-launch {
            0% { transform: translateY(0) rotate(-45deg); }
            20% { transform: translateY(10px) rotate(-45deg); }
            100% { transform: translateY(-1000px) rotate(-45deg); }
          }
          @keyframes shake {
            0%, 100% { transform: translate(0, 0) rotate(-45deg); }
            25% { transform: translate(-2px, 2px) rotate(-45deg); }
            75% { transform: translate(2px, -2px) rotate(-45deg); }
          }
          @keyframes smoke {
            0% { opacity: 0.8; transform: scale(1); }
            100% { opacity: 0; transform: scale(3); }
          }
          .animate-rocket {
            animation: shake 0.1s infinite, rocket-launch 1s ease-in 0.8s forwards;
          }
          .smoke-particle {
            animation: smoke 0.8s ease-out forwards;
          }
          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
        {showRocket ? (
          <div className="relative flex flex-col items-center justify-center h-full">
            {/* Rocket */}
            <div className="animate-rocket text-blue-600 text-7xl relative z-20">
              <i className="fa-solid fa-rocket"></i>
              {/* Flames */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                <div className="w-2 h-6 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-8 bg-yellow-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-6 bg-orange-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
            {/* Cloud/Smoke */}
            <div className="absolute bottom-10 flex gap-4">
              <div className="smoke-particle w-12 h-12 bg-slate-200 rounded-full delay-800"></div>
              <div className="smoke-particle w-16 h-16 bg-slate-100 rounded-full delay-900"></div>
              <div className="smoke-particle w-10 h-10 bg-slate-200 rounded-full delay-1000"></div>
            </div>
            <p className="mt-12 text-blue-600 font-black uppercase tracking-[0.3em] animate-pulse">Launching Payment...</p>
          </div>
        ) : (
          <div className="fade-in-up w-full flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 shadow-sm">
              <i className="fa-solid fa-check text-5xl"></i>
            </div>

            <h2 className="text-3xl font-bold mb-2 text-blue-600">Payment Successful</h2>
            <p className="text-slate-500 mb-8 text-sm">Successfully sent to {recipient}</p>
            
            <div className="w-full bg-blue-50 dark:bg-slate-800/50 p-6 rounded-[32px] mb-12 border border-blue-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-blue-400 font-bold uppercase tracking-wider text-[10px]">Amount Sent</span>
                <span className="font-black text-blue-900 dark:text-blue-100 text-lg">₹{parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-slate-400 font-medium">Recipient</span>
                <span className="font-bold text-slate-900 dark:text-white">{recipient}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Transaction ID</span>
                <span className="font-mono text-xs text-slate-500">ZENITH{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
            </div>

            <div className="w-full space-y-4">
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all active:scale-95"
              >
                Done
              </button>
              <button className="text-blue-600 font-bold text-sm">View Details</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 flex flex-col bg-slate-50 dark:bg-slate-900">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-xl font-bold">Send Money</h2>
      </div>

      {step === 'details' ? (
        <form onSubmit={handleSubmit} className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Recipient UPI ID or Name</label>
            <input
              type="text"
              placeholder="e.g. zenith@upi"
              className="w-full p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-slate-400">₹</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl text-4xl font-bold focus:ring-2 focus:ring-blue-500 outline-none text-center shadow-sm"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Note (Optional)</label>
            <input
              type="text"
              placeholder="What's this for?"
              className="w-full p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 active:scale-95 transition-transform"
            >
              Verify & Proceed
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8 flex-1 flex flex-col items-center pt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Enter Secure PIN</h3>
            <p className="text-slate-500 text-sm">Please enter your 4-digit ZenithPay PIN</p>
          </div>

          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 w-full px-8 max-w-[300px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '✓'].map((key, i) => (
              <button 
                key={i} 
                onClick={() => key === '✓' ? handlePinSubmit() : null}
                className={`w-16 h-16 text-2xl font-bold ${key === '✓' ? 'text-green-600' : 'text-slate-700 dark:text-white'} flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-blue-100 transition-colors`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
