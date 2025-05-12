"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchSearchResults } from "../utils/queries";
import { useQuery } from "@tanstack/react-query";
import AddPlaylist from "./AddPlaylist";

const mockData = {
  songs: [
    {
      name: "God's Plan",
      artist: "Drake",
      album: "Scorpion",
      image: "https://i.scdn.co/image/ab67616d00004851f907de96b9a4fbc04accc0d5",
      uri: "spotify:track:6DCZcSspjsKoFjzjrWoCdn",
    },
    {
      name: "Levitating (feat. DaBaby)",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      image: "https://i.scdn.co/image/ab67616d000048512172b607853fa89cefa2beb4",
      uri: "spotify:track:5nujrmhLynf4yMoMtj8AQF",
    },
    {
      name: "Peaches (feat. Daniel Caesar & Giveon)",
      artist: "Justin Bieber",
      album: "Justice",
      image: "https://i.scdn.co/image/ab67616d00004851e6f407c7f3a0ec98845e4431",
      uri: "spotify:track:4iJyoBOLtHqaGxP12qzhQI",
    },
    {
      name: "MONTERO (Call Me By Your Name)",
      artist: "Lil Nas X",
      album: "MONTERO",
      image: "https://i.scdn.co/image/ab67616d00004851be82673b5f79d9658ec0a9fd",
      uri: "spotify:track:1SC5rEoYDGUK4NfG82494W",
    },
    {
      name: "good 4 u",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      image: "https://i.scdn.co/image/ab67616d00004851a91c10fe9472d9bd89802e5a",
      uri: "spotify:track:4ZtFanR9U6ndgddUvNcjcG",
    },
    {
      name: "Kiss Me More (feat. SZA)",
      artist: "Doja Cat",
      album: "Planet Her",
      image: "https://i.scdn.co/image/ab67616d00004851be841ba4bc24340152e3a79a",
      uri: "spotify:track:3DarAbFujv6eYNliUTyqtz",
    },
    {
      name: "Astronaut In The Ocean",
      artist: "Masked Wolf",
      album: "Astronomical",
      image: "https://i.scdn.co/image/ab67616d00004851088f522766ecd59d1bbe9d07",
      uri: "spotify:track:3bh4UFPCTDXJvrMeVJVPSz",
    },
    {
      name: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      image: "https://i.scdn.co/image/ab67616d000048518863bc11d2aa12b54f5aeb36",
      uri: "spotify:track:5QO79kh1waicV47BqGRL3g",
    },
    {
      name: "drivers license",
      artist: "Olivia Rodrigo",
      album: "Hot Tracks",
      image: "https://i.scdn.co/image/ab67616d00004851ba845c32c836b954cc2b8f09",
      uri: "spotify:track:40WPOVOqpfSBuuOo2wUSjg",
    },
    {
      name: "Shivers",
      artist: "Ed Sheeran",
      album: "=",
      image: "https://i.scdn.co/image/ab67616d00004851ef24c3fdbf856340d55cfeb2",
      uri: "spotify:track:50nfwKoDiSYg8zOCREWAm5",
    },
    {
      name: "Woman",
      artist: "Doja Cat",
      album: "Planet Her",
      image: "https://i.scdn.co/image/ab67616d00004851be841ba4bc24340152e3a79a",
      uri: "spotify:track:6Uj1ctrBOjOas8xZXGqKk4",
    },
    {
      name: "Love Again",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      image: "https://i.scdn.co/image/ab67616d000048514bc66095f8a70bc4e6593f4f",
      uri: "spotify:track:4rPkN1FMzQyFNP9cLUGIIB",
    },
    {
      name: "Butter",
      artist: "BTS",
      album: "Proof",
      image: "https://i.scdn.co/image/ab67616d0000485117db30ce3f081d6818a8ad49",
      uri: "spotify:track:6jjYDGxVJsWS0a5wlVF5vS",
    },
    {
      name: "Bad Habits",
      artist: "Ed Sheeran",
      album: "=",
      image: "https://i.scdn.co/image/ab67616d00004851ef24c3fdbf856340d55cfeb2",
      uri: "spotify:track:3rmo8F54jFF8OgYsqTxm5d",
    },
    {
      name: "What You Know Bout Love",
      artist: "Pop Smoke",
      album: "Shoot For The Stars Aim For The Moon",
      image: "https://i.scdn.co/image/ab67616d0000485177ada0863603903f57b34369",
      uri: "spotify:track:1tkg4EHVoqnhR6iFEXb60y",
    },
    {
      name: "Mood (feat. iann dior)",
      artist: "24kGoldn",
      album: "El Dorado",
      image: "https://i.scdn.co/image/ab67616d0000485184c53fa832dfa265192419c5",
      uri: "spotify:track:4jPy3l0RUwlUI9T5XHBW2m",
    },
    {
      name: "For The Night (feat. Lil Baby & DaBaby)",
      artist: "Pop Smoke",
      album: "Shoot For The Stars Aim For The Moon",
      image: "https://i.scdn.co/image/ab67616d0000485177ada0863603903f57b34369",
      uri: "spotify:track:0PvFJmanyNQMseIFrU708S",
    },
    {
      name: "Laugh Now Cry Later (feat. Lil Durk)",
      artist: "Drake",
      album: "Laugh Now Cry Later (feat. Lil Durk)",
      image: "https://i.scdn.co/image/ab67616d0000485152c75ed37313b889447011ef",
      uri: "spotify:track:2SAqBLGA283SUiwJ3xOUVI",
    },
    {
      name: "ROCKSTAR (feat. Roddy Ricch)",
      artist: "DaBaby",
      album: "BLAME IT ON BABY",
      image: "https://i.scdn.co/image/ab67616d0000485120e08c8cc23f404d723b5647",
      uri: "spotify:track:7ytR5pFWmSjzHJIeQkgog4",
    },
    {
      name: "Savage Remix (feat. Beyoncé)",
      artist: "Megan Thee Stallion",
      album: "Savage Remix (feat. Beyoncé)",
      image: "https://i.scdn.co/image/ab67616d00004851cd613f53a22b92b14694943c",
      uri: "spotify:track:5v4GgrXPMghOnBBLmveLac",
    },
    {
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      image: "https://i.scdn.co/image/ab67616d000048518863bc11d2aa12b54f5aeb36",
      uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
    },
    {
      name: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      image: "https://i.scdn.co/image/ab67616d0000485177fdcfda6535601aff081b6a",
      uri: "spotify:track:6UelLqGlWMcVH1E5c4H7lY",
    },
    {
      name: "positions",
      artist: "Ariana Grande",
      album: "Positions",
      image: "https://i.scdn.co/image/ab67616d000048515ef878a782c987d38d82b605",
      uri: "spotify:track:35mvY5S1H3J2QZyna3TFe0",
    },
    {
      name: "willow",
      artist: "Taylor Swift",
      album: "evermore",
      image: "https://i.scdn.co/image/ab67616d0000485133b8541201f1ef38941024be",
      uri: "spotify:track:0lx2cLdOt3piJbcaXIV74f",
    },
    {
      name: "deja vu",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      image: "https://i.scdn.co/image/ab67616d00004851a91c10fe9472d9bd89802e5a",
      uri: "spotify:track:6HU7h9RYOaPRFeh0R3UeAr",
    },
    {
      name: "INDUSTRY BABY (feat. Jack Harlow)",
      artist: "Lil Nas X",
      album: "INDUSTRY BABY (feat. Jack Harlow)",
      image: "https://i.scdn.co/image/ab67616d00004851ba26678947112dff3c3158bf",
      uri: "spotify:track:27NovPIUIRrOZoCHxABJwK",
    },
  ],
  description:
    "This workout playlist is curated with the user's preferences in mind, featuring a mix of popular pop tracks from the 2020s onwards. With a focus on energetic and uplifting beats, the playlist includes songs from favorite artist Drake, as well as other prominent artists like Dua Lipa, Justin Bieber, and The Weeknd. The selection is designed to keep the user motivated and moving throughout their workout, with a blend of catchy hooks, infectious rhythms, and inspiring lyrics to push through any challenge.",
};

const page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [devData] = useState(mockData);

  useEffect(() => {
    console.log("xxx");
  }, []);

  // const {data, isPending, isError, error, isSuccess} = useQuery({
  //   queryKey: ['searchResult', query],
  //   queryFn: () => fetchSearchResults(query as string),
  //   enabled: !!query && !useMockData,

  // })

  // if (isPending) {
  //   return <p>Pending</p>
  // }

  // if (isError) {
  //   return <p>Error: {error.message}</p>
  // }

  // if(isSuccess) {
  //   console.log(data)
  // }
  useEffect(() => {
    console.log(devData);
  }, []);

  const [showAll, setShowAll] = useState(false);

  const uniqueAlbumImages = Array.from(
    new Set(devData.songs.map((song) => song.image))
  ).slice(0, 4);
  const songsToShow = showAll ? devData.songs : devData.songs.slice(0, 8);

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-10">
      <div className="flex justify-between border width-[100%] items-center">
      <div className=" w-[124px] grid grid-cols-2 grid-rows-2">
        {uniqueAlbumImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Album Cover"
            className="shadow-lg aspect-square object-contain w-full h-full"
          />
        ))}
      </div>

      <AddPlaylist songs={devData}/>

      </div>
      

      <div className="mb-8 text-center flex flex-col gap-5 text-white font-semibold"></div>

      <div className="grid grid-cols-2 gap-3">
        {songsToShow.map((song, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-4 bg-white  shadow-sm hover:shadow-md transition"
          >
            <img
              src={song.image}
              alt={song.album}
              className="w-14 h-14 rounded"
            />
            <div className="flex-1">
              <p className="font-semibold text-lg ">{song.name}</p>
              <p className="text-sm ">
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

      {/* Show More Button */}
      {!showAll && devData.songs.length > 8 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-green-600  px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
