"use client";

import { TypewriterEffect } from "./ui/typewriter-effect";
import handleSpotifyLogin from "../utils/queries";

const HeroMessage = () => {
  async function testFunc() {
    try {
      await handleSpotifyLogin();
    } catch (error: any) {
      console.error("Error fetching data from API:", error.message || error);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-start justify-center pl-[10%] gap-10 bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
  <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
    Music for when:
  </h2>

  <TypewriterEffect
    words={[
      { text: "you wake up" },
      { text: "you go to bed" },
      { text: "you are in love" },
      { text: "you are sad" },
      { text: "you are happy" },
    ]}
    className="text-4xl sm:text-5xl md:text-6xl italic text-pink-400"
  />

  <button
    className="w-[250px] sm:w-[300px] md:w-[350px] p-4 rounded-2xl bg-pink-600 hover:bg-pink-700 transition-colors font-semibold text-lg md:text-xl shadow-lg"
    onClick={testFunc}
  >
    Get started now with Spotify
  </button>
</div>

  );
};

export default HeroMessage;
