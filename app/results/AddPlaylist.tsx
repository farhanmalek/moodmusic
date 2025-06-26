'use client'
import React, { ChangeEvent, useState } from 'react'
import ImageAdder from './ImageAdder';
import { Song } from '../utils/queries';
import { createUserPlaylist } from '../utils/queries';
import { useSearchParams } from 'next/navigation';
import PortalModal from '../../components/PortalModal';

interface AddPlaylistProps {
  songs: Song | any
}

const AddPlaylist = ({songs}: AddPlaylistProps) => {
    const [showMakeModal, setShowMakeModal] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('')
    const [image, setImage] = useState<string | null>(null)
    const [formMessage, setFormMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [createdPlaylist, setCreatedPlaylist] = useState<any>(null)

    const searchParams = useSearchParams()
    const query = searchParams.get('query')

    const handleNameChange = (e:ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      if (formMessage?.includes("Please provide a playlist name")) {
        setFormMessage("")
      }
    }

    const handlePlaylistCreate = async () => {
      setIsLoading(true)
      setFormMessage('')
      if (!inputValue) {
        setFormMessage("Please provide a playlist name")
        return
      }

      let base64String: string | null =  null

      if (image) {
        base64String = image.split(',')[1]
      }
  
      const res = await createUserPlaylist(songs?.songs, inputValue, base64String, query )
      console.log(res, "res")
      setIsLoading(false)
      setIsSuccess(true)
      setCreatedPlaylist(res.playlist)
    }

  return (
    <>
      <button
        className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white font-bold shadow-lg hover:from-[#1ed760] hover:to-[#1DB954] transition-all duration-200 backdrop-blur-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2"
        onClick={() => setShowMakeModal(!showMakeModal)}
      >
        <span className="drop-shadow">Make it Mine</span>
      </button>

      <PortalModal isOpen={showMakeModal}>
        {
          isSuccess ? (
            <div className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-center text-white">Playlist Created</h2>
              <p className="text-center text-white">Your playlist has been created successfully.</p>
              <p>Check out here: <a href={`https://open.spotify.com/playlist/${createdPlaylist?.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Playlist</a></p>
              <button
                onClick={() => {
                  setShowMakeModal(false)
                  setIsSuccess(false)
                  setCreatedPlaylist(null)
                  setInputValue('')
                  setImage(null)
                  setFormMessage(null)
                  setIsLoading(false)
                }}
                className="mt-4 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white px-3 font-bold py-2 rounded-lg shadow hover:from-[#1ed760] hover:to-[#1DB954] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              >
                Close 
              </button>
            </div>
          ) : <div className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Make It Yours</h2>
          <input
            type="text"
            value={inputValue}
            placeholder="Give your playlist a name..."  
            onChange={handleNameChange}
            required
            className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1DB954] placeholder-gray-400"
          />
          <ImageAdder image={image} setImage={setImage} />
          <button
            type="submit"
            onClick={handlePlaylistCreate}
            className="w-full mt-4 bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-white font-bold py-2 rounded-lg shadow hover:from-[#1ed760] hover:to-[#1DB954] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          >
            {isLoading ? "Creating..." : "Create Playlist"}
          </button>
          <div className="h-[30px] p-2 mt-2 text-sm text-center text-red-400 min-h-[1.5em]">
            {formMessage}
          </div>
          <button
            onClick={() => {
              setImage(null)
              setInputValue('')
              setFormMessage(null)
              setShowMakeModal(false)
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        }
        
      </PortalModal>
    </>
  )
}

export default AddPlaylist