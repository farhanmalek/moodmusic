import React from 'react'

const Language = () => {
  return (
    <div className="text-center px-6 py-8">
      <h2 className="text-2xl font-semibold  mb-4">What language do you mostly listen to music in?</h2>
      <p className=" mb-6 max-w-md mx-auto">
        This helps us recommend songs and artists that resonate with your language preferences.
      </p>

      {/* Placeholder for language input */}
      <input
        type="text"
        placeholder="e.g., English, Spanish, Hindi"
        className="w-full max-w-md mx-auto px-4 py-2 rounded-lg bg-zinc-800  border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  )
}

export default Language
