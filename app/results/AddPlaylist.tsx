import React, { useState } from 'react'
import Modal from '../components/quiz/quizModal';

const AddPlaylist = () => {

    const [showMakeModal, setShowMakeModal] = useState<boolean>(false);


 


  return (
    <>
    <button onClick={() => setShowMakeModal(!showMakeModal)}>
        Make it Mine
    </button>
    {
        showMakeModal && <Modal isOpen={showMakeModal}>
            <p>Nigger</p>
        </Modal>
    }
    </>
    
  )
}

export default AddPlaylist