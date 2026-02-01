
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

interface Pulse {
  id: number;
  scale: number;
  opacity: number;
  born: number;
}

const SleepChallenge: React.FC<Props> = ({ onComplete }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [recovery, setRecovery] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState("");
  const requestRef = useRef<number>(null);
  const targetRecovery = 100;
  const syncThreshold = 0.18;

  useEffect(() => {
    if (recovery >= targetRecovery) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      setTimeout(onComplete, 1000);
      return;
    }
    if (!isStarted) return;

    const update = () => {
      const now = Date.now();
      setPulses(prev => {
        const next = prev
          .map(p => {
            const age = (now - p.born) / 1600;
            return {
              ...p,
              scale: age * 2.2,
              opacity: age < 0.5 ? age * 2 : 1 - ((age - 0.5) * 2)
            };
          })
          .filter(p => p.scale < 2.5);

        if (next.length === 0 || (now - next[next.length - 1].born > 1300)) {
            next.push({ id: now, scale: 0, opacity: 0, born: now });
        }
        return next;
      });
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isStarted, recovery, onComplete]);

  const handleSync = () => {
    if (!isStarted) return;
    const activePulse = pulses.find(p => Math.abs(p.scale - 1.0) < syncThreshold);
    if (activePulse) {
      setRecovery(r => Math.min(targetRecovery, r + 10));
      setStreak(s => s + 1);
      setFeedback("PURE HARMONY!");
      setPulses(prev => prev.filter(p => p.id !== activePulse.id));
    } else {
      setStreak(0);
      setFeedback("MISSED THE BEAT!");
      setRecovery(r => Math.max(0, r - 5));
    }
    setTimeout(() => setFeedback(""), 800);
  };

  return (
    <div className="flex flex-col items-center p-10 glass rounded-[3rem] border-2 border-white shadow-2xl mt-16 relative overflow-hidden h-[650px] select-none">
      <div className="text-center z-20 mb-8">
        <h2 className="text-4xl font-bungee text-rose-600">HEARTBEAT SYNC</h2>
        <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.5em] mt-3">Match the rhythm of the recovery</p>
      </div>

      <div className="w-full max-w-sm flex justify-between items-end mb-10 z-20 px-6">
        <div className="text-left">
            <div className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Recovery Score</div>
            <div className="text-4xl font-bungee text-rose-700">{Math.floor(recovery)}%</div>
        </div>
        <div className="text-right">
            <div className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Soul Streak</div>
            <div className="text-4xl font-bungee text-rose-500">{streak}</div>
        </div>
      </div>

      <div 
        className="relative w-full aspect-square max-w-[380px] bg-white/40 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-white/60 shadow-inner"
        onClick={handleSync}
      >
        <div className="absolute w-[45%] h-[45%] rounded-full border-4 border-dashed border-rose-200 animate-[spin_12s_linear_infinite]"></div>
        <div className="absolute w-[45%] h-[45%] rounded-full border-2 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.2)]"></div>

        <div className="z-30 text-8xl text-rose-600 animate-float drop-shadow-xl">
            <i className="fas fa-heart"></i>
        </div>

        {pulses.map(p => (
           <div 
            key={p.id}
            className="absolute rounded-full border-2 border-rose-400 pointer-events-none"
            style={{ 
                width: `${p.scale * 45}%`, 
                height: `${p.scale * 45}%`,
                opacity: p.opacity,
                boxShadow: `0 0 25px rgba(251,113,133,${p.opacity * 0.4})`
            }}
           ></div>
        ))}

        {feedback && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full text-center">
                <div className={`font-bungee text-xl ${feedback.includes('HARMONY') ? 'text-rose-600' : 'text-red-400'} animate-ping`}>
                    {feedback}
                </div>
            </div>
        )}

        {!isStarted && (
           <div className="absolute inset-0 glass z-50 flex flex-col items-center justify-center p-8 text-center rounded-full">
              <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mb-6 shadow-xl">
                <i className="fas fa-heart-pulse text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bungee text-rose-800 mb-2 uppercase">RECOVERY MODE</h3>
              <p className="text-rose-900/40 text-[10px] font-black uppercase tracking-widest mb-10">
                Tap when the pulse hits the ring baby
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsStarted(true); }}
                className="bg-rose-600 text-white px-12 py-4 rounded-full font-bungee text-xl shadow-xl hover:bg-rose-500 transition-all"
              >
                START SYNC
              </button>
           </div>
        )}
      </div>

      <div className="mt-auto pt-8 text-[9px] font-black uppercase text-rose-300 tracking-[0.6em] text-center">
        True champions rest as hard as they play
      </div>

      {recovery >= targetRecovery && (
        <div className="absolute inset-0 bg-white z-[60] flex flex-col items-center justify-center animate-in fade-in duration-1000">
           <i className="fas fa-check-circle text-7xl text-rose-500 mb-4"></i>
           <h3 className="text-5xl font-bungee text-rose-600">RECOVERED!</h3>
           <p className="text-rose-400 font-bold tracking-[0.4em] uppercase mt-2 text-xs">Full stamina for the final play</p>
        </div>
      )}
    </div>
  );
};

export default SleepChallenge;
