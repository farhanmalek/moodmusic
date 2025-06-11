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
    <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden w-[100vw] h-[100vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 via-transparent to-black/50" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#1DB954]/10 rounded-full blur-3xl animate-blob border" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#1ed760]/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1DB954] mb-12"
        />

        <button
          onClick={testFunc}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DB954] focus:ring-offset-gray-900"
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#1DB954] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-black border-2 border-[#1DB954] group-hover:bg-[#1DB954]"></span>
          <span className="relative flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Get started with Spotify
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroMessage;
