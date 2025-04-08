"use client"

import { TypewriterEffect } from "./ui/typewriter-effect"

const HeroMessage = () => {
  
  
    return (
    <div className="h-screen flex flex-col pl-[10%] pt-[5%] gap-10 ">
        <h2 className="text-7xl">Music for when:</h2>
        <TypewriterEffect
          words={[
            { text: "you wake up" },
            { text: "you go to bed" },
            { text: "you are in love" },
            { text: "you are sad" },
            { text: "you are happy" },
          ]}
          className="text-7xl italic"/>
        <button className="w-[350px] p-4 rounded-2xl font-body bg-pink-700 font-semibold text-xl" onClick={() => console.log('coon')}>Get started now with Spotify</button>
    </div>
  )
}

export default HeroMessage