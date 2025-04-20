import React from 'react'

const TimePeriod = () => {
  return (
    <div className="text-center px-6 py-8">
      <h2 className="text-2xl font-semibold  mb-4">What era of music do you vibe with most?</h2>
      <p className="mb-6 max-w-md mx-auto">
        Choose a time range that best fits your preferred sound. This helps us tailor song recommendations to the era you love.
      </p>

      {/* Placeholder for time period input */}
      <input
        type="text"
        placeholder="e.g., 2010–2015, 2020 onward"
        className="w-full max-w-md mx-auto px-4 py-2 rounded-lg bg-zinc-800  border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  )
}

export default TimePeriod
