
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

const GymChallenge: React.FC<Props> = ({ onComplete }) => {
  const [reps, setReps] = useState(0);
  const [weightPos, setWeightPos] = useState(50);
  const [zonePos, setZonePos] = useState(50);
  const [zoneDir, setZoneDir] = useState(1);
  const [isHolding, setIsHolding] = useState(false);
  const targetReps = 15;
  const requestRef = useRef<number>(null);

  useEffect(() => {
    if (reps >= targetReps) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      setTimeout(onComplete, 1000);
      return;
    }

    const update = () => {
      setZonePos(prev => {
        let next = prev + (zoneDir * 0.9);
        if (next > 80) { setZoneDir(-1); return 80; }
        if (next < 20) { setZoneDir(1); return 20; }
        return next;
      });

      setWeightPos(prev => {
        const fallSpeed = 0.7;
        const liftSpeed = isHolding ? 1.6 : 0;
        const next = prev + fallSpeed - liftSpeed;
        return Math.min(95, Math.max(5, next));
      });

      setReps(prev => {
        const inZone = Math.abs(weightPos - zonePos) < 12;
        if (inZone) return prev + 0.05;
        return Math.max(0, prev - 0.02);
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [zoneDir, isHolding, weightPos, zonePos, reps, onComplete]);

  const progress = (reps / targetReps) * 100;
  const isOptimal = Math.abs(weightPos - zonePos) < 12;

  return (
    <div className="flex flex-col items-center space-y-8 p-10 glass rounded-[3rem] border-2 border-white shadow-xl mt-16 relative overflow-hidden">
      <div className="text-center z-10">
        <h2 className="text-4xl font-bungee text-rose-600 mb-2">HEART STRENGTH</h2>
        <p className="text-rose-400 font-bold uppercase tracking-widest text-xs italic">Sync your rhythm to the <span className="text-rose-600">Perfect Pulse</span></p>
      </div>

      <div className="w-full flex gap-8 items-center h-80">
        <div className="w-8 h-full bg-rose-50 rounded-full border-2 border-rose-100 overflow-hidden relative shadow-inner">
          <div 
            className="absolute bottom-0 w-full bg-gradient-to-t from-rose-600 to-red-400 transition-all duration-100"
            style={{ height: `${progress}%` }}
          ></div>
        </div>

        <div 
          className="flex-grow h-full bg-white/50 rounded-[2.5rem] relative border-2 border-rose-100 overflow-hidden cursor-pointer touch-none shadow-inner"
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
        >
          {/* Sync Zone */}
          <div 
            className={`absolute w-full h-24 transition-colors duration-300 ${isOptimal ? 'bg-rose-500/20 border-y-2 border-rose-500/50' : 'bg-rose-100/10 border-y-2 border-rose-200/20'}`}
            style={{ top: `${zonePos}%`, transform: 'translateY(-50%)' }}
          >
             <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black text-rose-400 uppercase tracking-[0.3em]">Harmony</div>
          </div>

          {/* The Heart Dumbbell */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 transition-transform duration-75"
            style={{ top: `${weightPos}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className={`p-4 rounded-full glass border-2 flex items-center gap-1 ${isOptimal ? 'border-rose-500 shadow-lg' : 'border-rose-200'}`}>
                <div className="flex items-center">
                  <div className="h-1 w-4 bg-rose-300 rounded-full"></div>
                  <i className={`fas fa-heart text-4xl ${isOptimal ? 'text-rose-600 animate-pulse' : 'text-rose-200'}`}></i>
                  <div className="h-1 w-4 bg-rose-300 rounded-full"></div>
                </div>
            </div>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[8px] font-black text-rose-300 uppercase whitespace-nowrap">Heart Dumbbell</div>
          </div>
        </div>
      </div>

      <div className="text-center">
         <div className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-300 mb-3">Loyalty Progress</div>
         <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-2 w-10 rounded-full transition-all duration-500 ${progress > (i+1)*20 ? 'bg-rose-600 shadow-sm' : 'bg-rose-100'}`}></div>
            ))}
         </div>
      </div>

      {reps >= targetReps && (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-50 animate-in fade-in">
          <i className="fas fa-heart-pulse text-rose-500 text-6xl mb-4"></i>
          <h3 className="text-5xl font-bungee text-rose-600 animate-bounce text-center">STRONGER TOGETHER</h3>
          <p className="text-rose-400 font-black tracking-widest uppercase text-sm mt-2">Leveling up our bond</p>
        </div>
      )}
    </div>
  );
};

export default GymChallenge;
