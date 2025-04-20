import React from 'react'

const ListenPreference = () => {
  return (
    <div className="text-center px-6 py-8">
      <h2 className="text-2xl font-semibold  mb-4">What genres do you vibe with?</h2>
      <p className=" mb-6 max-w-md mx-auto">
        Select a few genres you usually listen to. This will help us tune your playlists to your mood and taste.
      </p>

      {/* Placeholder genre list */}
      <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
        {["Hip Hop", "Pop", "Jazz", "Rock", "Electronic", "R&B", "Indie"].map((genre) => (
          <button
            key={genre}
            className="px-4 py-2 rounded-full bg-zinc-800  border border-zinc-600 hover:bg-zinc-700 transition"
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ListenPreference
