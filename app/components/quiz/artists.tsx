import React from 'react'
import { quizProps } from './language'

const Artists = ({quizData, setQuizData}: quizProps) => {
  return (
    <div className="text-center px-6 py-8">
      <h2 className="text-2xl font-semibold mb-4">Got any favorite artists?</h2>
      <p className="mb-6 max-w-md mx-auto">
        Type in the names of artists you usually enjoy. This helps us tailor your playlist to match your exact taste.
      </p>

      <input
        type="text"
        placeholder="E.g., Drake, Taylor Swift, Burna Boy..."
        className="w-full max-w-md mx-auto px-4 py-2 rounded-md bg-zinc-800 placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={quizData.artists}
        onChange={(e) => {setQuizData((prev) => ({ ...prev, artists: e.target.value }))}}
      />

    </div>
  )
}

export default Artists
