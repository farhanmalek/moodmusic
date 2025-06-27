"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { fetchSearchResults } from "../utils/queries";
import { useQuery } from "@tanstack/react-query";
import AddPlaylist from "./AddPlaylist";

const Spinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="w-16 h-16 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin mb-4"></div>
    <span className="text-lg text-white font-semibold">Loading results...</span>
  </div>
);

const ResultsContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [showAll, setShowAll] = useState(false);

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["searchResult", query],
    queryFn: () => fetchSearchResults(query as string),
    enabled: !!query,
  });

  if (isPending) return <Spinner />;
  if (isError) return <p className="text-center text-red-500 font-semibold mt-10">Error: {error.message}</p>;
  if (!isSuccess || !data) return null; // extra guard

  const uniqueAlbumImages = Array.from(
    new Set(data.songs.map((song) => song.image))
  ).slice(0, 4);

  const songsToShow = showAll ? data.songs : data.songs.slice(0, 8);

  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed background gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      {/* Content */}
      <div className="relative z-10 py-12 px-2 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="w-32 h-32 grid grid-cols-2 grid-rows-2 gap-1 rounded-xl overflow-hidden shadow-lg">
              {uniqueAlbumImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Album Cover"
                  className="aspect-square object-cover w-full h-full"
                />
              ))}
            </div>
            <AddPlaylist songs={data} />
          </div>

          <div className="mb-4 text-center text-2xl font-bold text-white/90 tracking-wide">
            {query ? `Results for "${query}"` : "Results"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {songsToShow.map((song, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-white/20 rounded-xl shadow-md hover:shadow-xl transition group"
              >
                <img
                  src={song.image}
                  alt={song.album}
                  className="w-16 h-16 rounded-lg shadow-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg text-white truncate">{song.name}</p>
                  <p className="text-sm text-white/70 truncate">
                    {song.artist} • {song.album}
                  </p>
                </div>
                <a
                  href={`https://open.spotify.com/track/${song.uri.split(":").pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 px-4 py-2 rounded-full bg-[#1DB954] text-white font-bold text-sm shadow hover:bg-[#169c46] transition group-hover:scale-105"
                >
                  Play
                </a>
              </div>
            ))}
          </div>

          {!showAll && data.songs.length > 8 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(true)}
                className="bg-[#1DB954] px-8 py-3 rounded-full text-white font-bold text-lg shadow hover:bg-[#169c46] transition"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ResultsContent />
    </Suspense>
  );
};

export default Page;
