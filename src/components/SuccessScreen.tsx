
import React, { useEffect, useState } from 'react';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const SuccessScreen: React.FC = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    const timer = setTimeout(() => setShowImage(true), 800);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="text-center space-y-10 animate-in slide-in-from-bottom duration-1000">
      <div className="relative inline-block">
        <div className="absolute -inset-10 bg-gradient-to-r from-red-600 to-yellow-500 blur-3xl opacity-20 animate-pulse"></div>
        <div className="relative bg-slate-800 p-8 rounded-full border-4 border-yellow-500 shadow-2xl">
          <i className="fas fa-trophy text-8xl text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"></i>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-7xl md:text-8xl font-bungee text-white tracking-tighter">ALL-STAR CHOICE</h1>
        <p className="text-2xl font-bold text-red-500 italic uppercase tracking-widest">Valentine's Season: SECURED</p>
      </div>
      
      <div className="max-w-xl mx-auto bg-slate-800/30 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
        <p className="text-xl text-slate-300 leading-relaxed font-medium italic">
          "Best decision of the draft, baby. We're going to have the most legendary Valentine's Day in history. 
          Get ready for the highlights."
        </p>
      </div>

      <div className={`transition-all duration-1000 transform ${showImage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative inline-block group">
           <div className="absolute -inset-2 bg-red-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition"></div>
           <img 
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800" 
            alt="Happy Valentine" 
            className="rounded-[2rem] shadow-2xl border-2 border-white/10 mx-auto max-w-full h-64 object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-full text-white font-bungee text-sm">
            TEAM US ❤️
          </div>
        </div>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="block mx-auto text-slate-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-[0.4em]"
      >
        Watch Replay
      </button>
    </div>
  );
};

export default SuccessScreen;
