'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Modal from '../components/quiz/quizModal';
import ImageAdder from './ImageAdder';
import { Song } from '../utils/queries';
import { createUserPlaylist } from '../utils/queries';
import { useSearchParams } from 'next/navigation';

interface AddPlaylistProps {
  songs: Song | any
}


const AddPlaylist = ({songs}: AddPlaylistProps) => {

    const [showMakeModal, setShowMakeModal] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('')
    const [image, setImage] = useState<string | null>(null)
    const [formMessage, setFormMessage] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const query = searchParams.get('query')

    const handleNameChange = (e:ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      if (formMessage?.includes("Please provide a playlist name")) {
        setFormMessage("")
      }
    }

    const handlePlaylistCreate = async () => {
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

    }


  return (
    <>
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    onClick={() => setShowMakeModal(!showMakeModal)}
  >
    Make it Mine
  </button>

  {showMakeModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md relative">
        <h2 className="text-2xl font-semibold mb-4 text-center">Make It Yours</h2>

        <input
          type="text"
          value={inputValue}
          placeholder="Give your playlist a name..."
          onChange={handleNameChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <ImageAdder image={image} setImage={setImage} />

        <button
          type="submit"
          onClick={handlePlaylistCreate}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Create Playlist
        </button>

        <div className="h-[30px] p-2 mt-2 text-sm text-center text-gray-600">
          {formMessage}
        </div>

        <button
          onClick={() => {
            setImage(null)
            setInputValue('')
            setFormMessage(null)
            setShowMakeModal(false)
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-3xl"
        >
          &times;
        </button>
      </div>
    </div>
  )}
</>

  )
}

export default AddPlaylist