
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

const FootballChallenge: React.FC<Props> = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 30 });
  const [keeperX, setKeeperX] = useState(50);
  const [keeperDir, setKeeperDir] = useState(1);
  const [ballState, setBallState] = useState({ x: 50, y: 85, scale: 1, visible: true });
  const [isKicking, setIsKicking] = useState(false);
  const [message, setMessage] = useState("Show that world-class touch");

  useEffect(() => {
    if (isKicking) return;
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      if (stage < 4) {
        const radius = 20 + (stage * 5);
        const speed = stage === 2 ? 0.6 : 1.2 + (stage * 0.4); 
        setTargetPos({
          x: 50 + Math.cos(time * speed) * radius,
          y: 35 + Math.sin(time * speed * 0.7) * 15
        });
      } else {
        setKeeperX(prev => {
          let next = prev + (keeperDir * 5.5);
          if (next > 75) { setKeeperDir(-1); return 75; }
          if (next < 25) { setKeeperDir(1); return 25; }
          return next;
        });
      }
    }, 16);
    return () => clearInterval(interval);
  }, [stage, keeperDir, isKicking]);

  const handleShoot = (e: React.MouseEvent) => {
    if (isKicking) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    const capturedTargetPos = { ...targetPos };

    setIsKicking(true);
    setBallState({ x: clickX, y: clickY, scale: 0.25, visible: true });

    setTimeout(() => {
      let success = false;
      if (stage < 4) {
        const dist = Math.sqrt(Math.pow(clickX - capturedTargetPos.x, 2) + Math.pow(clickY - capturedTargetPos.y, 2));
        success = dist < (15 - stage); 
      } else {
        const inGoal = clickY < 50 && clickX > 15 && clickX < 85;
        const saved = Math.abs(clickX - keeperX) < 12;
        success = inGoal && !saved;
      }

      if (success) {
        if (stage < 4) {
          setMessage(`BOTTLE THAT MAGIC!`);
          setStage(s => s + 1);
          setIsKicking(false);
          setBallState({ x: 50, y: 85, scale: 1, visible: true });
        } else {
          setMessage("GOLDEN BOOT WINNER!");
          setTimeout(onComplete, 1500);
        }
      } else {
        setMessage("EYES ON THE PRIZE, BABY!");
        setIsKicking(false);
        setBallState({ x: 50, y: 85, scale: 1, visible: true });
      }
    }, 600);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8 glass rounded-[3rem] border-4 border-white shadow-2xl mt-16 relative overflow-hidden min-h-[650px] select-none">
      <div className="text-center z-10">
        <h2 className="text-4xl font-bungee text-rose-600">THE LOVE ARENA</h2>
        <div className="flex justify-center gap-2 mt-3">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-2 w-12 rounded-full transition-all duration-500 ${stage >= s ? 'bg-rose-500 shadow-sm' : 'bg-rose-100'}`}></div>
          ))}
        </div>
        <p className="text-rose-400 font-black text-xs uppercase tracking-[0.4em] mt-4 animate-pulse">{message}</p>
      </div>

      <div 
        className="relative w-full flex-grow bg-rose-50 rounded-[2.5rem] border-2 border-white overflow-hidden cursor-crosshair shadow-inner"
        onClick={handleShoot}
      >
        {/* Pitch Lines */}
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,#fff_40px,#fff_41px)]"></div>
        
        {/* Goal - Rose Gold theme */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[80%] h-52 border-8 border-b-0 border-rose-300 rounded-t-3xl shadow-[0_20px_50px_rgba(251,113,133,0.1)]">
           <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
           
           {stage < 4 && !isKicking && (
            <div 
              className="absolute bg-rose-500 rounded-full border-4 border-white shadow-lg"
              style={{ 
                left: `${targetPos.x}%`, 
                top: `${targetPos.y}%`, 
                width: `${60 - stage * 4}px`, 
                height: `${60 - stage * 4}px`,
                transform: 'translate(-50%, -50%)' 
              }}
            >
              <div className="absolute inset-0 border-2 border-white rounded-full animate-ping opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                <i className="fas fa-heart"></i>
              </div>
            </div>
          )}

          {stage === 4 && (
            <div 
              className="absolute bottom-0 w-24 h-36 transition-all duration-100 flex flex-col items-center z-10"
              style={{ left: `${keeperX}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-14 h-14 bg-rose-600 rounded-full border-4 border-white mb-1 shadow-lg flex items-center justify-center">
                 <i className="fas fa-shield-heart text-white"></i>
              </div>
              <div className="w-20 h-24 bg-rose-700 border-4 border-white rounded-t-3xl flex items-center justify-center font-black text-white text-xs">GOALIE</div>
            </div>
          )}
        </div>

        {/* The Ball - White & Rose Gold */}
        <div 
          className="absolute transition-all duration-600 ease-out z-20 pointer-events-none"
          style={{ 
            left: `${ballState.x}%`, 
            top: `${ballState.y}%`, 
            transform: `translate(-50%, -50%) scale(${ballState.scale}) rotate(${isKicking ? '1080deg' : '0deg'})`,
            opacity: ballState.visible ? 1 : 0
          }}
        >
          <div className="bg-white rounded-full w-20 h-20 border-4 border-rose-200 shadow-2xl flex items-center justify-center">
            <i className="fas fa-futbol text-4xl text-rose-500"></i>
          </div>
        </div>
      </div>

      <div className="text-rose-300 text-[9px] font-black uppercase tracking-[0.5em] text-center pt-2">
        A clinical strike wins the hearts of the crowd
      </div>
    </div>
  );
};

export default FootballChallenge;
