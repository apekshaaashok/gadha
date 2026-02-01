
import React, { useState, useEffect, useCallback } from 'react';
import { GameState } from './types';
import StartScreen from './components/StartScreen';
import GymChallenge from './components/GymChallenge';
import FootballChallenge from './components/FootballChallenge';
import SleepChallenge from './components/SleepChallenge';
import BurritoChallenge from './components/BurritoChallenge';
import ProposalScreen from './components/ProposalScreen';
import SuccessScreen from './components/SuccessScreen';
import { getGameCommentary } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [commentary, setCommentary] = useState<string>("Ready for a love that wins every time?");
  const [isCommentaryLoading, setIsCommentaryLoading] = useState<boolean>(false);

  const updateCommentary = async (stage: string, perf: string) => {
    setIsCommentaryLoading(true);
    try {
      const result = await getGameCommentary(stage, perf);
      setCommentary(result.message);
    } catch (e) {
      setCommentary("You're my ultimate All-Star, baby!");
    } finally {
      setIsCommentaryLoading(false);
    }
  };

  const nextStage = () => {
    let next: GameState;
    let stageName: string;
    let perfNote: string;

    switch (gameState) {
      case GameState.START: 
        next = GameState.GYM;
        stageName = "Gym";
        perfNote = "Drafting the heavy hitters!";
        break;
      case GameState.GYM: 
        next = GameState.FOOTBALL;
        stageName = "Football";
        perfNote = "Powering through the workout!";
        break;
      case GameState.FOOTBALL: 
        next = GameState.SLEEP;
        stageName = "Sleep";
        perfNote = "Scored big on the pitch!";
        break;
      case GameState.SLEEP: 
        next = GameState.BURRITO;
        stageName = "Burrito";
        perfNote = "Fully rested and recovered!";
        break;
      case GameState.BURRITO: 
        next = GameState.PROPOSAL;
        stageName = "Proposal";
        perfNote = "Refueled and ready for the big one!";
        break;
      case GameState.PROPOSAL: 
        next = GameState.SUCCESS;
        stageName = "Success";
        perfNote = "The contract is signed!";
        break;
      default: 
        next = GameState.START;
        stageName = "Start";
        perfNote = "Back at the beginning!";
    }

    setGameState(next);
    updateCommentary(stageName, perfNote);
  };

  const loadingText = gameState === GameState.PROPOSAL 
    ? "Counting every reason I love you… 💗" 
    : "Reviewing the highlights...";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff0f3] via-[#ffccd5] to-[#ffb3c1] text-[#590d22] flex flex-col items-center justify-center p-4 selection:bg-rose-200">
      {/* Premium Commentary Banner */}
      {gameState !== GameState.START && gameState !== GameState.SUCCESS && (
        <div className="fixed top-0 left-0 w-full glass p-4 z-50 flex items-center justify-center gap-3 border-b border-rose-200 shadow-sm transition-all">
          <i className={`fas fa-heart text-rose-500 text-xl ${isCommentaryLoading ? 'animate-bounce' : 'animate-pulse'}`}></i>
          <p className="text-base md:text-lg font-bold italic text-center max-w-2xl text-rose-900">
            {isCommentaryLoading ? loadingText : commentary}
          </p>
        </div>
      )}

      <div className="w-full max-w-4xl transition-all duration-700">
        {gameState === GameState.START && <StartScreen onStart={nextStage} />}
        {gameState === GameState.GYM && <GymChallenge onComplete={nextStage} />}
        {gameState === GameState.FOOTBALL && <FootballChallenge onComplete={nextStage} />}
        {gameState === GameState.SLEEP && <SleepChallenge onComplete={nextStage} />}
        {gameState === GameState.BURRITO && <BurritoChallenge onComplete={nextStage} />}
        {gameState === GameState.PROPOSAL && <ProposalScreen onYes={nextStage} />}
        {gameState === GameState.SUCCESS && <SuccessScreen />}
      </div>

      {/* Footer Branding */}
      <footer className="fixed bottom-4 text-rose-400/60 text-xs font-black uppercase tracking-[0.5em] pointer-events-none">
        A Love Worth Choosing • 2025
      </footer>
    </div>
  );
};

export default App;
