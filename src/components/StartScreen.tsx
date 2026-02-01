
import React from 'react';

interface Props {
  onStart: () => void;
}

const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="text-center space-y-8 animate-in fade-in zoom-in duration-1000">
      <div className="relative inline-block group">
        <div className="absolute -inset-4 bg-white rounded-[3rem] blur-3xl opacity-40 animate-pulse"></div>
        <div className="relative glass border-4 border-white p-10 md:p-16 rounded-[3rem] leading-none flex flex-col items-center shadow-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <i className="fas fa-heart text-rose-400 text-3xl animate-float"></i>
          </div>
          <h1 className="text-6xl md:text-8xl font-bungee tracking-tighter text-rose-600 mb-2">THE DRAFT</h1>
          <p className="text-rose-400 font-playfair text-3xl mb-8 italic">A Love Worth Choosing</p>
          <div className="h-[2px] w-32 bg-rose-100 mb-8"></div>
          <p className="text-rose-500 font-black text-sm uppercase tracking-[0.4em] flex items-center gap-2">
            HEART UNDER REVIEW <span className="animate-pulse">💖</span>
          </p>
        </div>
      </div>
      
      <p className="text-xl md:text-2xl text-rose-900/80 max-w-2xl mx-auto leading-relaxed font-medium italic px-4">
        “You’ve been my constant. My calm on loud days, my smile on quiet ones. 
        Before I say this out loud, I just want you to know… every moment with you has already felt like a win.”
      </p>

      <div className="flex justify-center gap-10 py-4">
        {[
          { icon: 'heart', label: 'HEART', color: 'text-rose-400' },
          { icon: 'house-chimney-heart', label: 'HOME', color: 'text-rose-500' },
          { icon: 'users', label: 'US', color: 'text-red-500' }
        ].map((item, idx) => (
          <div key={idx} className="group cursor-default flex flex-col items-center">
             <i className={`fas fa-${item.icon} ${item.color} text-3xl group-hover:scale-125 transition-transform duration-500`}></i>
             <div className="mt-2 text-[10px] font-black text-rose-300 uppercase tracking-widest">{item.label}</div>
          </div>
        ))}
      </div>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-20 py-7 font-bold text-white transition-all duration-500 bg-rose-600 font-bungee text-2xl tracking-wider rounded-full hover:bg-rose-500 hover:scale-105 shadow-[0_25px_50px_rgba(225,29,72,0.3)] overflow-hidden"
      >
        <span className="relative flex items-center gap-3">
          ENTER MY HEART <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
        </span>
      </button>
    </div>
  );
};

export default StartScreen;
