"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../utils/queries";
import { useQuery } from "@tanstack/react-query";
import AddPlaylist from "./AddPlaylist";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [showAll, setShowAll] = useState(false);

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["searchResult", query],
    queryFn: () => fetchSearchResults(query as string),
    enabled: !!query,
  });

  if (isPending) return <p>Pending</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!isSuccess || !data) return null; // extra guard

  const uniqueAlbumImages = Array.from(
    new Set(data.songs.map((song) => song.image))
  ).slice(0, 4);

  const songsToShow = showAll ? data.songs : data.songs.slice(0, 8);

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-10">
      <div className="flex justify-between width-[100%] items-center">
        <div className="w-[124px] grid grid-cols-2 grid-rows-2">
          {uniqueAlbumImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Album Cover"
              className="shadow-lg aspect-square object-contain w-full h-full"
            />
          ))}
        </div>

        <AddPlaylist songs={data} />
      </div>

      <div className="mb-8 text-center flex flex-col gap-5 text-white font-semibold"></div>

      <div className="grid grid-cols-2 gap-3">
        {songsToShow.map((song, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              src={song.image}
              alt={song.album}
              className="w-14 h-14 rounded"
            />
            <div className="flex-1">
              <p className="font-semibold text-lg">{song.name}</p>
              <p className="text-sm">
                {song.artist} • {song.album}
              </p>
            </div>
            <a
              href={`https://open.spotify.com/track/${song.uri
                .split(":")
                .pop()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline text-sm font-bold"
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
            className="bg-green-600 px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
