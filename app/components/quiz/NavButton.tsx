import React, { Dispatch, SetStateAction } from 'react'
import { submitUserQuiz } from '@/app/utils/queries'
import { quizAnswers } from '@/app/search/page'
import { useUserStore } from '@/app/utils/context/store'
interface NavButtonProps {
  action: string
  handleModalNavChange?: (action: string) => void,
  setIsFirstLogin?: Dispatch<SetStateAction<boolean>>
  quizAnswers?: quizAnswers
  setQuizData?: Dispatch<SetStateAction<quizAnswers>>
}

const NavButton = ({ action, handleModalNavChange, setIsFirstLogin, quizAnswers, setQuizData }: NavButtonProps) => {
  const { user,setUser } = useUserStore()

 async function handleQuizSubmit() {
    const finalQuizData = {
      ...quizAnswers,
      user_id: user?.id,
    };


    await submitUserQuiz(finalQuizData as quizAnswers) //submit the quiz
    setUser({
      ...user!,
      quiz_answers: quizAnswers!
    });
    
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
