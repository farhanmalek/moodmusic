import React, { Dispatch, SetStateAction } from 'react'

interface NavButtonProps {
  action: string
  handleModalNavChange?: (action: string) => void,
  setIsFirstLogin?: Dispatch<SetStateAction<boolean>>
}

const NavButton = ({ action, handleModalNavChange, setIsFirstLogin }: NavButtonProps) => {
  function handleQuizSubmit() {
    console.log('quiz submitted')
    // submit modal
    // onsubmit, close modal
  }

  const isSubmit = action === 'Submit'
  const handleClick = () => {
    if (isSubmit) {
      handleQuizSubmit()
      setIsFirstLogin?.(false)
    } else {
      handleModalNavChange?.(action)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`px-5 py-2 rounded-md font-medium transition duration-200 w-[50%] text-white ${
        isSubmit
          ? 'bg-purple-600 hover:bg-purple-700'
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
    >
      {action}
    </button>
  )
}

export default NavButton
