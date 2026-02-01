
import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
}

type MealType = 'Burrito' | 'Rice Bowl' | 'Quesadilla';
type DietType = 'veg' | 'non-veg';

interface ProteinOption {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

interface StapleIngredient {
  id: string;
  name: string;
  icon: string;
  metaphor: string;
  color: string;
}

const BurritoChallenge: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<'diet' | 'type' | 'protein' | 'assembly'>('diet');
  const [diet, setDiet] = useState<DietType | null>(null);
  const [mealType, setMealType] = useState<MealType | null>(null);
  const [protein, setProtein] = useState<ProteinOption | null>(null);
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [currentMetaphor, setCurrentMetaphor] = useState<string>("");

  // Exact proteins from the provided menu
  const proteins: Record<DietType, ProteinOption[]> = {
    'veg': [
      { id: 'veg_fajita', name: 'Veg Fajita', icon: '🫑', desc: 'Peppers & onions' },
      { id: 'crispy_mushroom', name: 'Crispy Mushroom', icon: '🍄', desc: 'Seasoned & fried' },
      { id: 'peri_potato', name: 'Peri Peri Potato', icon: '🥔', desc: 'Spiced crispy bites' },
      { id: 'habanero_paneer', name: 'Habanero Paneer', icon: '🌶️', desc: 'Spicy Mexican paneer' },
      { id: 'bbq_paneer', name: 'Barbeque Paneer', icon: '🧀', desc: 'Sweet & smoky grilled' }
    ],
    'non-veg': [
      { id: 'bbq_chicken', name: 'Barbeque Chicken', icon: '🍗', desc: 'Grilled BBQ juicy chicken' },
      { id: 'habanero_chicken', name: 'Habanero Chicken', icon: '🔥', desc: 'Juicy with a spicy kick' },
      { id: 'peri_chicken', name: 'Peri Peri Chicken', icon: '🐔', desc: 'Crispy seasoned pieces' },
      { id: 'chipotle_chicken', name: 'Chipotle Chicken', icon: '🌶️', desc: 'Smoky chili flavor' }
    ]
  };

  const staples: StapleIngredient[] = [
    { id: 'base', name: mealType === 'Rice Bowl' ? 'Cilantro Rice' : 'Soft Tortilla', icon: mealType === 'Rice Bowl' ? '🍚' : '🫓', color: 'bg-orange-50', metaphor: "The foundation of my world—without you, everything falls apart." },
    { id: 'fajita_veg', name: 'Fajita Veggies', icon: '🫑', color: 'bg-green-100', metaphor: "The vibrant variety and color you add to my every single day." },
    { id: 'pico', name: 'Pico de Gallo', icon: '🍅', color: 'bg-red-100', metaphor: "The fresh start and zest you bring to our morning routines." },
    { id: 'beans', name: 'Pinto Beans', icon: '🫘', color: 'bg-amber-900', metaphor: "The substance and strength that keeps me grounded when things get tough." },
    { id: 'guac', name: 'Guacamole', icon: '🥑', color: 'bg-green-600', metaphor: "The softness and calm that perfectly balances my high energy." },
    { id: 'sauce', name: 'Secret Sauce', icon: '🥣', color: 'bg-orange-400', metaphor: "The special bond that ties all our different moments into one perfect story." }
  ];

  const handleDietSelect = (d: DietType) => {
    setDiet(d);
    setStep('type');
  };

  const handleTypeSelect = (t: MealType) => {
    setMealType(t);
    setStep('protein');
  };

  const handleProteinSelect = (p: ProteinOption) => {
    setProtein(p);
    setStep('assembly');
  };

  const handleAddIngredient = (ing: StapleIngredient) => {
    if (addedIngredients.includes(ing.id)) return;
    setAddedIngredients([...addedIngredients, ing.id]);
    setCurrentMetaphor(ing.metaphor);
  };

  const isComplete = addedIngredients.length === staples.length;

  return (
    <div className="flex flex-col items-center p-6 md:p-10 bg-white rounded-[3rem] border-8 border-[#E31C2C] shadow-2xl mt-16 relative overflow-hidden min-h-[750px] text-slate-900">
      {/* Branding Header - Exact Wordmark Red #E31C2C */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bungee text-[#E31C2C] tracking-tighter uppercase leading-none italic">
          CALIFORNIA<br/>BURRITO
        </h1>
        <div className="flex justify-center gap-1 mt-3">
            <div className="h-1.5 w-14 bg-green-600"></div>
            <div className="h-1.5 w-14 bg-yellow-500"></div>
            <div className="h-1.5 w-14 bg-amber-800"></div>
        </div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#E31C2C]/60">Fresh • Bold • Honest</p>
      </div>

      {/* Step 1: Diet Selection */}
      {step === 'diet' && (
        <div className="flex flex-col items-center animate-in fade-in zoom-in w-full max-w-xl">
          <h2 className="text-2xl font-bungee text-slate-800 mb-8 text-center">START YOUR ORDER BABY</h2>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <button onClick={() => handleDietSelect('veg')} className="flex-1 group flex flex-col items-center p-8 bg-green-50 rounded-3xl border-4 border-transparent hover:border-green-600 transition-all shadow-sm">
              <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">🥬</span>
              <span className="font-bungee text-green-700 text-xl">VEGETARIAN</span>
              <p className="text-[10px] font-black uppercase text-green-600/50 mt-2 tracking-widest">Fresh & Natural</p>
            </button>
            <button onClick={() => handleDietSelect('non-veg')} className="flex-1 group flex flex-col items-center p-8 bg-red-50 rounded-3xl border-4 border-transparent hover:border-[#E31C2C] transition-all shadow-sm">
              <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">🍗</span>
              <span className="font-bungee text-red-700 text-xl">NON-VEG</span>
              <p className="text-[10px] font-black uppercase text-red-600/50 mt-2 tracking-widest">Bold & Energized</p>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Meal Type Selection */}
      {step === 'type' && (
        <div className="flex flex-col items-center animate-in slide-in-from-right w-full">
          <h2 className="text-2xl font-bungee text-slate-800 mb-8">PICK YOUR PLATFORM</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
            {['Burrito', 'Rice Bowl', 'Quesadilla'].map((t) => (
              <button 
                key={t}
                onClick={() => handleTypeSelect(t as MealType)}
                className="p-8 bg-slate-50 border-2 border-slate-200 rounded-3xl hover:border-[#E31C2C] hover:bg-red-50 transition-all group flex flex-col items-center shadow-sm"
              >
                <div className="text-5xl mb-4 group-hover:rotate-12 transition-transform">{t === 'Burrito' ? '🌯' : t === 'Rice Bowl' ? '🥣' : '🧀'}</div>
                <div className="font-bungee text-slate-700 text-base group-hover:text-[#E31C2C]">{t}</div>
                <div className="text-[9px] font-bold text-slate-400 mt-2 uppercase">Customized for you</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep('diet')} className="mt-8 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500">Change Preference</button>
        </div>
      )}

      {/* Step 3: Protein Selection */}
      {step === 'protein' && diet && (
        <div className="flex flex-col items-center animate-in slide-in-from-right w-full">
          <h2 className="text-2xl font-bungee text-slate-800 mb-6 uppercase tracking-tight">THE POWER CORE</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {proteins[diet].map((p) => (
              <button 
                key={p.id}
                onClick={() => handleProteinSelect(p)}
                className="p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl hover:border-[#E31C2C] hover:shadow-xl transition-all group text-center flex flex-col items-center"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{p.icon}</div>
                <div className="font-bungee text-slate-800 text-xs leading-tight mb-2 uppercase">{p.name}</div>
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">{p.desc}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep('type')} className="mt-8 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500">Back to Meals</button>
        </div>
      )}

      {/* Step 4: Assembly */}
      {step === 'assembly' && protein && (
        <div className="w-full flex flex-col items-center animate-in fade-in">
          <div className="bg-red-50 p-5 rounded-3xl border-2 border-red-100 mb-6 flex items-center gap-5 w-full max-w-md shadow-inner">
            <div className="text-5xl bg-white p-3 rounded-2xl shadow-sm">{protein.icon}</div>
            <div>
              <div className="text-[10px] font-black uppercase text-[#E31C2C] tracking-widest mb-1">Your Draft Pick</div>
              <div className="font-bungee text-slate-800 text-lg leading-none">{protein.name} {mealType}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-start">
            {/* Ingredients Menu */}
            <div className="grid grid-cols-2 gap-3">
              {staples.map((ing) => (
                <button
                  key={ing.id}
                  disabled={addedIngredients.includes(ing.id)}
                  onClick={() => handleAddIngredient(ing)}
                  className={`p-5 rounded-3xl flex flex-col items-center transition-all border-2 shadow-sm
                    ${addedIngredients.includes(ing.id) 
                      ? 'bg-slate-100 border-slate-200 opacity-40 grayscale scale-95' 
                      : 'bg-white border-slate-100 hover:border-[#E31C2C] hover:scale-105 active:scale-95'}`}
                >
                  <span className="text-4xl mb-2">{ing.icon}</span>
                  <span className="text-[10px] font-black uppercase text-slate-700 tracking-tighter">{ing.name}</span>
                </button>
              ))}
            </div>

            {/* Visual Assembly Area */}
            <div className="relative h-64 md:h-80 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 overflow-hidden shadow-inner">
               <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full border border-slate-200 text-[10px] font-black text-[#E31C2C]">
                  {addedIngredients.length} / {staples.length} LAYERS
               </div>

               <div className="relative w-full h-full flex items-center justify-center">
                  {/* Dynamic Visual Base */}
                  <div className={`transition-all duration-700 absolute 
                    ${mealType === 'Rice Bowl' ? 'w-56 h-24 rounded-b-full bg-slate-200 border-b-8 border-slate-300' : 'w-64 h-36 rounded-full bg-[#fdf2e9] border-4 border-[#eedcc8]'} 
                    ${addedIngredients.includes('base') ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    {mealType === 'Rice Bowl' && <div className="absolute inset-0 bg-white/20 rounded-b-full"></div>}
                  </div>

                  {/* Falling Icons */}
                  <div className="relative z-10 flex flex-wrap justify-center gap-3 max-w-[200px]">
                     {addedIngredients.map((id) => (
                       <div key={id} className="text-4xl animate-in slide-in-from-top-6 duration-500 drop-shadow-xl">
                         {staples.find(s => s.id === id)?.icon}
                       </div>
                     ))}
                  </div>
               </div>

               {/* Metaphor Narrative */}
               <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-red-100 shadow-md text-center min-h-[70px] flex items-center justify-center">
                  <p className="text-[12px] italic font-bold text-slate-600 leading-tight">
                    {currentMetaphor || "Select your fresh ingredients baby..."}
                  </p>
               </div>
            </div>
          </div>

          <div className="w-full max-w-md mt-10">
            {isComplete ? (
              <button 
                onClick={onComplete}
                className="w-full py-6 bg-[#E31C2C] text-white font-bungee text-2xl rounded-full hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-[0_25px_50px_rgba(227,28,44,0.4)] animate-bounce uppercase"
              >
                WRAP IT UP! 🌯
              </button>
            ) : (
              <div className="text-center">
                 <div className="text-[11px] font-black uppercase text-slate-400 tracking-[0.5em] mb-3">Freshly Sourced...</div>
                 <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
                   <div 
                    className="h-full bg-green-600 transition-all duration-500 rounded-full"
                    style={{ width: `${(addedIngredients.length / staples.length) * 100}%` }}
                   ></div>
                 </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Brand Identity Accents */}
      <div className="mt-auto pt-8 flex gap-8 opacity-30 grayscale pointer-events-none">
          <i className="fas fa-carrot text-orange-500"></i>
          <i className="fas fa-pepper-hot text-red-600"></i>
          <i className="fas fa-leaf text-green-600"></i>
          <i className="fas fa-bowl-food text-amber-800"></i>
      </div>
    </div>
  );
};

export default BurritoChallenge;
