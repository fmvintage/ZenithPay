
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScanPay: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-black relative flex flex-col items-center justify-center p-6">
      {/* Viewfinder */}
      <div className="relative w-72 h-72 border-2 border-white/50 rounded-3xl mb-12">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl -m-1"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl -m-1"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl -m-1"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-3xl -m-1"></div>
        
        {/* Animated Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-scan"></div>
      </div>

      <div className="text-center text-white mb-20">
        <h2 className="text-2xl font-bold mb-2">Scan any QR Code</h2>
        <p className="text-slate-400 text-sm">Align the QR code within the frame to pay</p>
      </div>

      <div className="flex gap-12 text-white">
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-bolt text-lg"></i>
          </div>
          <span className="text-xs">Flash</span>
        </button>
        <button className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-image text-lg"></i>
          </div>
          <span className="text-xs">Gallery</span>
        </button>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
      >
        <i className="fa-solid fa-xmark text-xl"></i>
      </button>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScanPay;
