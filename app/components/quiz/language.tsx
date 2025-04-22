import { quizAnswers } from '@/app/search/page'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

export interface quizProps {
  quizData: quizAnswers,
  setQuizData:  Dispatch<SetStateAction<quizAnswers>>
}


const Language = ({quizData, setQuizData}:quizProps) => {

  return (
    <div className="text-center px-6 py-8">
      <h2 className="text-2xl font-semibold  mb-4">What language do you mostly listen to music in?</h2>
      <p className=" mb-6 max-w-md mx-auto">
        This helps us recommend songs and artists that resonate with your language preferences.
      </p>

      <input
        type="text"
        placeholder="e.g., English, Spanish, Hindi"
        className="w-full max-w-md mx-auto px-4 py-2 rounded-lg bg-zinc-800  border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) => setQuizData(prev => ({ ...prev, language: e.target.value }))}
        value={quizData.language}
        required
      />
    </div>
  )
}

export default Language
