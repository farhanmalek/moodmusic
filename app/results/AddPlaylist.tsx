import React, { ChangeEvent, useState } from 'react'
import Modal from '../components/quiz/quizModal';
import ImageAdder from './ImageAdder';
import { Song } from '../utils/queries';

interface AddPlaylistProps {
  songs: Song | any
}


const AddPlaylist = ({songs}: AddPlaylistProps) => {

    const [showMakeModal, setShowMakeModal] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('')
    const [image, setImage] = useState<string | null>(null)

    const handleNameChange = (e:ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    }

    const handlePlaylistCreate = () => {
      //TODO: create playlist submission function
    }
 


  return (
    <>
    <button onClick={() => setShowMakeModal(!showMakeModal)}>
        Make it Mine
    </button>
    {
        showMakeModal && <Modal isOpen={showMakeModal}>
          <h2>Make It Yours</h2>
            <input type='text' value={inputValue} placeholder='Give your playlist a name...' onChange={(e) => handleNameChange(e)} required/>
            <ImageAdder image={image} setImage={setImage}/>
            <button type='submit' onClick={handlePlaylistCreate}>Create Playlist</button>
            
        </Modal>
    }
    </>
    
  )
}

export default AddPlaylist