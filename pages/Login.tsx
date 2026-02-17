
import React, { useState } from 'react';
import { useApp } from '../App';

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
    <div className="flex-1 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-bolt-lightning text-4xl text-white"></i>
        </div>
        <h1 className="text-3xl font-bold">ZenithPay</h1>
        <p className="text-blue-100 mt-2">Swift, Secure, Smart</p>
      </div>

      <div className="w-full bg-white text-slate-900 rounded-3xl p-8 shadow-2xl">
        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-slate-500 text-sm">Enter your phone number to get started</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+91</span>
              <input
                type="tel"
                placeholder="98765 43210"
                maxLength={10}
                className="w-full pl-14 pr-4 py-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform disabled:opacity-50"
              disabled={phone.length !== 10}
            >
              Get OTP
            </button>
          </form>
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <button onClick={() => setStep('phone')} className="text-slate-400 hover:text-blue-600">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h2 className="text-2xl font-bold">Verify OTP</h2>
            <p className="text-slate-500 text-sm">Sent to +91 {phone}</p>
            <div className="flex justify-between gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  className="w-14 h-16 text-center text-2xl font-bold bg-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                />
              ))}
            </div>
            <button
              onClick={handleOtpVerify}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
            >
              Verify & Proceed
            </button>
          </div>
        )}

        {step === 'name' && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p className="text-slate-500 text-sm">Please enter your full name to set up your account.</p>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
            >
              Complete Setup
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 text-center text-blue-100 text-xs">
        <p>By continuing, you agree to our</p>
        <p className="font-semibold underline cursor-pointer">Terms & Privacy Policy</p>
      </div>
    </div>
  );
};

export default Login;
