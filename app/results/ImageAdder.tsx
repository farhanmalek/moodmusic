import React, { ChangeEvent, useState } from 'react'

interface ImageAdderProps {
    image: string | null
    setImage: React.Dispatch<React.SetStateAction<string | null>>
}

const ImageAdder = ({image, setImage}: ImageAdderProps) => {


    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];

        if (!file) return;

        //read the file
        const reader = new FileReader()
        reader.onload = () => {
            setImage(reader.result as string);
        }
        reader.readAsDataURL(file);



    }


  return (
    <>
    <p>Personalise your new playlist with a cover.</p>
    <input type='file' accept='image/*' onChange={handleImageUpload}/>
    {
        image && <div>
            <p>Preview:</p>
            <img src={image} alt='Spotify Album Image' />
        </div>
    }

    </>
  )
}

export default ImageAdder