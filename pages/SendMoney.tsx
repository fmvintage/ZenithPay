
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App.tsx';
import { TransactionType, TransactionStatus } from '../types.ts';

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
        osc.frequency.setValueAtTime(880, startTime);
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
            <div className="animate-rocket text-blue-600 text-7xl relative z-20">
              <i className="fa-solid fa-rocket"></i>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                <div className="w-2 h-6 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-6 bg-orange-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
            {/* Smoke Particles */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="smoke-particle absolute bottom-0 bg-slate-200 dark:bg-slate-700 rounded-full blur-xl"
                style={{
                  width: `${Math.random() * 40 + 20}px`,
                  height: `${Math.random() * 40 + 20}px`,
                  left: `${Math.random() * 100 - 50}%`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              ></div>
            ))}
          </div>
        ) : (
          <div className="fade-in-up">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-check text-4xl"></i>
            </div>
            <h2 className="text-3xl font-bold mb-2">Payment Successful</h2>
            <p className="text-slate-500 mb-8">₹{amount} sent to {recipient}</p>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl mb-8 border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Transaction ID</span>
                <span className="font-mono font-bold">ZNP884210</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Time</span>
                <span className="font-bold">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              Back to Home
            </button>
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

      <div className="bg-white dark:bg-slate-800 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-700">
        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Recipient Name / UPI ID</label>
              <input
                type="text"
                placeholder="Name, Phone or UPI ID"
                className="w-full p-4 bg-slate-100 dark:bg-slate-700 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none font-bold text-2xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Add a Note (Optional)</label>
              <input
                type="text"
                placeholder="What's this for?"
                className="w-full p-4 bg-slate-100 dark:bg-slate-700 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all mt-4"
            >
              Proceed to Pay
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <h3 className="text-xl font-bold mb-2">Secure PIN</h3>
            <p className="text-slate-400 text-sm mb-8">Enter your 4-digit ZenithPay PIN to authorize payment of ₹{amount}</p>
            <div className="flex justify-center gap-4 mb-12">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700"></div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '✓'].map((key, i) => (
                <button
                  key={i}
                  onClick={() => key === '✓' ? handlePinSubmit() : null}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:bg-blue-600 active:text-white"
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMoney;
