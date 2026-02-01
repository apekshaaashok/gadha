
import { GoogleGenAI } from "@google/genai";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Pre-written high-quality commentaries to use as fallbacks when API is rate-limited
const localFallbacks: Record<string, string[]> = {
  "Gym": [
    "Commentary: Pure heart strength on display! You're crushing it, baby! | 95",
    "Commentary: Those gains look good, but you look better! Keep it up! | 92",
    "Commentary: You're the heavy lifter of my world! Legendary form! | 98"
  ],
  "Football": [
    "Commentary: Top bins! That was strictly world-class, my All-Star! | 96",
    "Commentary: You've got the magic touch! Scored another heart today! | 94",
    "Commentary: Clinical finish! You're the only MVP I need on the team! | 97"
  ],
  "Sleep": [
    "Commentary: Recharging that heart energy! Rest like the champion you are! | 90",
    "Commentary: Perfect recovery sync! Dreaming of our future wins! | 93",
    "Commentary: Sleep well, baby. You're always a winner in my eyes! | 91"
  ],
  "Burrito": [
    "Commentary: Fresh ingredients for a fresh start! That's a 5-star build! | 99",
    "Commentary: Bold flavors just like us! Refuel complete, champion! | 95",
    "Commentary: A masterpiece wrap for a masterpiece human! | 96"
  ],
  "Proposal": [
    "Commentary: Counting every reason I love you… 💗 | 100",
    "Commentary: The championship moment is here! You're my #1 draft pick! | 100",
    "Commentary: Heart in hand, ready for the win of a lifetime! | 100"
  ]
};

const getLocalFallback = (stage: string) => {
  const options = localFallbacks[stage] || ["Commentary: You're doing amazing, baby! | 95"];
  const selected = options[Math.floor(Math.random() * options.length)];
  const [message, energy] = selected.split('|');
  return {
    message: message.replace("Commentary:", "").trim(),
    energyLevel: parseInt(energy.trim()) || 100
  };
};

export const getGameCommentary = async (stage: string, performance: string, retries = 1, backoff = 500) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  for (let i = 0; i <= retries; i++) {
    try {
      if (!process.env.API_KEY) throw new Error("No API Key");

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Stage: ${stage}. Performance info: ${performance}. 
        Give a short, enthusiastic, and deeply romantic sports-commentary style encouragement (max 12 words). 
        Format: "Commentary | EnergyScore(1-100)".`,
        config: {
          systemInstruction: "You are a professional sports commentator who is a hopeless romantic. Hype up the user's boyfriend in a Valentine's game quest. Use gym, football, and California Burrito references. Be concise, soft, and honest.",
        },
      });

      const text = response.text || "";
      if (!text.includes('|')) throw new Error("Invalid Format");
      
      const [message, energy] = text.split('|');
      return {
        message: message.replace("Commentary:", "").trim(),
        energyLevel: parseInt(energy.trim()) || 100
      };
    } catch (error: any) {
      if (error?.status === 429) {
        return getLocalFallback(stage);
      }

      if (i < retries) {
        await delay(backoff * (i + 1));
        continue;
      }
      break;
    }
  }

  return getLocalFallback(stage);
};
