
import React, { useState } from 'react';
import { useApp } from '../App.tsx';

const Login: React.FC = () => {
  const { login } = useApp();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'name'>('phone');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpVerify = () => {
    if (otp.every(v => v !== '')) {
      setStep('name');
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
    }
  };

  return (
    <div className="flex-1 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-cyan-600 to-blue-800 text-white">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-2xl">
          <i className="fa-solid fa-gem text-4xl text-white"></i>
        </div>
        <h1 className="text-4xl font-black tracking-tight">KyanPay</h1>
        <p className="text-cyan-100 mt-2 text-sm font-medium tracking-wide uppercase opacity-80">Hyper-Speed Economy</p>
      </div>

      <div className="w-full bg-white text-slate-900 rounded-[2.5rem] p-8 shadow-2xl">
        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold">Get Started</h2>
            <p className="text-slate-500 text-sm">Experience the elite payment network</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+91</span>
              <input
                type="tel"
                placeholder="98765 43210"
                maxLength={10}
                className="w-full pl-14 pr-4 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-cyan-500 transition-all outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-cyan-600 text-white rounded-2xl font-bold shadow-lg shadow-cyan-100 active:scale-95 transition-transform disabled:opacity-50"
              disabled={phone.length !== 10}
            >
              Verify Identity
            </button>
          </form>
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <button onClick={() => setStep('phone')} className="text-slate-400 hover:text-cyan-600">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h2 className="text-2xl font-bold">Secure OTP</h2>
            <p className="text-slate-500 text-sm">Verification code sent to +91 {phone}</p>
            <div className="flex justify-between gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  className="w-14 h-16 text-center text-2xl font-bold bg-slate-50 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                />
              ))}
            </div>
            <button
              onClick={handleOtpVerify}
              className="w-full py-4 bg-cyan-600 text-white rounded-2xl font-bold shadow-lg shadow-cyan-100 active:scale-95 transition-transform"
            >
              Connect Node
            </button>
          </div>
        )}

        {step === 'name' && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Setup</h2>
            <p className="text-slate-500 text-sm">Enter your legal name for KYC</p>
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-cyan-500 transition-all outline-none font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-4 bg-cyan-600 text-white rounded-2xl font-bold shadow-lg shadow-cyan-100 active:scale-95 transition-transform"
            >
              Launch KyanPay
            </button>
          </form>
        )}
      </div>

      <div className="mt-10 text-center text-cyan-100 text-[10px] font-bold uppercase tracking-widest opacity-60">
        <p>Encrypted by Kyan Security Protocol v2.4</p>
      </div>
    </div>
  );
};

export default Login;