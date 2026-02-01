
import React, { useState } from 'react';

interface Props {
  onYes: () => void;
}

const ProposalScreen: React.FC<Props> = ({ onYes }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noSize, setNoSize] = useState(1);

  const moveNo = () => {
    const x = (Math.random() - 0.5) * 500;
    const y = (Math.random() - 0.5) * 300;
    setNoPos({ x, y });
    setNoSize(prev => Math.max(0.2, prev - 0.05));
  };

  return (
    <div className="flex flex-col items-center space-y-12 p-12 glass rounded-[3.5rem] border-4 border-white shadow-[0_40px_100px_rgba(225,29,72,0.15)] text-rose-900 mt-16 animate-in zoom-in duration-1000 relative">
      <div className="text-center relative pt-16">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
           <div className="bg-rose-600 w-28 h-28 rounded-full flex items-center justify-center shadow-2xl border-8 border-white animate-float">
             <i className="fas fa-crown text-4xl text-white"></i>
           </div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bungee text-rose-600 mb-6 tracking-tighter leading-none">
          THE MOMENT I’VE BEEN WAITING FOR
        </h2>
        
        <div className="bg-white/50 p-10 rounded-[2.5rem] border border-white/60 max-w-2xl shadow-inner backdrop-blur-md">
          <p className="text-xl md:text-2xl font-medium italic text-rose-900 leading-relaxed font-playfair">
            “Some people come into your life and quietly change everything. 
            You became my safe place without trying, my favorite thought without knowing. 
            So here I am, heart in hand, asking just one thing…”
          </p>
        </div>
      </div>

      <div className="space-y-10 text-center w-full">
        <h3 className="text-2xl md:text-3xl font-bungee tracking-tight text-rose-500 px-4">
          Will you be mine this Valentine’s… and all the little days after?
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 min-h-[220px] relative">
          <button 
            onClick={onYes}
            className="group relative px-24 py-12 bg-rose-600 text-white font-bungee text-4xl md:text-5xl rounded-[2.5rem] hover:bg-rose-500 hover:scale-110 transition-all shadow-[0_30px_60px_rgba(225,29,72,0.4)] active:scale-95 z-10 uppercase"
          >
            I’M YOURS 💕
            <div className="absolute -inset-2 rounded-[2.5rem] border-4 border-rose-300 animate-ping opacity-30 pointer-events-none"></div>
          </button>

          <button 
            onMouseEnter={moveNo}
            onClick={moveNo}
            style={{ 
              transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noSize})`,
              transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            className="px-8 py-4 bg-rose-100 text-rose-300 font-black rounded-2xl cursor-not-allowed opacity-40 border-2 border-rose-200 uppercase tracking-tighter text-xs"
          >
            Not today
          </button>
        </div>
      </div>

      <div className="pt-10 flex gap-12 text-rose-200 text-2xl opacity-40">
        <i className="fas fa-heart"></i>
        <i className="fas fa-sparkles"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-heart"></i>
      </div>
    </div>
  );
};

export default ProposalScreen;
