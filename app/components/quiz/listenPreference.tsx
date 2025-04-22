import React, { useEffect } from 'react'
import { quizProps } from './language'

const ListenPreference = ({quizData, setQuizData}: quizProps) => {

  function handleGenreSelect(CurrGenre:string) {
  
    setQuizData(prev => {
      const isSelected = prev.listening_preferences.includes(CurrGenre);
      console.log(CurrGenre)
      const updatedGenres = isSelected
        ? prev.listening_preferences.filter(genre => genre !== CurrGenre)
        : [...prev.listening_preferences, CurrGenre];
  
      return {
        ...prev,
        listening_preferences: updatedGenres
      };
    });
  }
  

  return (
    <div className="text-center px-6 py-8">
      <h2 className="text-2xl font-semibold  mb-4">What genres do you vibe with?</h2>
      <p className=" mb-6 max-w-md mx-auto">
        Select a few genres you usually listen to. This will help us tune your playlists to your mood and taste.
      </p>

      <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
        {["Hip Hop", "Pop", "Jazz", "Rock", "Electronic", "R&B", "Indie"].map((genre) => (
          <button
            key={genre}
            className={`text-white px-4 py-2 rounded-full bg-zinc-800 border border-zinc-600 ${quizData.listening_preferences.includes(genre) ? "bg-gray-400" : "bg-black"}`}
            onClick={() => handleGenreSelect(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ListenPreference
