"use client";

import React, { useEffect, useState } from "react";
import { useUserStore, fetchUser } from "../utils/context/store";
import Modal from "../components/quiz/quizModal";
import IntroQuiz from "../components/quiz/IntroQuiz";
import Language from "../components/quiz/language";
import TimePeriod from "../components/quiz/timePeriod";
import ListenPreference from "../components/quiz/listenPreference";
import Artists from "../components/quiz/artists";
import NavButton from "../components/quiz/NavButton";
import FinishedQuiz from "../components/quiz/FinishedQuiz";
import Pill from "./components/Pill";
import SearchBar from "./components/SearchBar";

export interface quizAnswers {
  language: string;
  time_period: string;
  listening_preference: Array<string>;
  artists: Array<string>;
}

const page = () => {
  const { user, setUser } = useUserStore();
  const [hydrated, setHydrated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<number>(0);
  const [quizData, setQuizData] = useState<quizAnswers>({
    language: "",
    time_period: "",
    listening_preference: [],
    artists: [],
  });

  const [inputEmpty, setInputEmpty] = useState<boolean>(false);

  const modalStepMap: Record<number, React.ReactElement> = {
    0: <IntroQuiz />,
    1: <Language quizData={quizData} setQuizData={setQuizData} />,
    2: <TimePeriod quizData={quizData} setQuizData={setQuizData} />,
    3: <ListenPreference quizData={quizData} setQuizData={setQuizData} />,
    4: <Artists quizData={quizData} setQuizData={setQuizData} />,
    5: <FinishedQuiz />,
  };

  const currentStep = modalStepMap[modalStep];

  const handleModalNavChange = (action: string) => {
    if (action === "Back") {
      setInputEmpty(false);
      setModalStep((prev) => prev - 1);
    }

    if (action === "Next") {
      setInputEmpty(false);

      switch (modalStep) {
        case 1:
          if (!quizData.language) {
            setInputEmpty(true);
            return;
          }
          break;
        case 2:
          if (!quizData.time_period) {
            setInputEmpty(true);
            return;
          }
          break;
        case 3:
          if (quizData.listening_preference.length === 0) {
            setInputEmpty(true);
            return;
          }
          break;
        case 4:
          if (!quizData.artists) {
            setInputEmpty(true);
            return;
          }
          break;
      }

      setModalStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      const getUser = async () => {
        const fetchedUser = await fetchUser();
        setUser(fetchedUser);
      };
      getUser();
    }
  }, [hydrated]);

  useEffect(() => {
    if (!user) return;

    const isFirstLogin =
      Object.keys(user.quiz_answers).length > 0 ? false : true;
    if (isFirstLogin) {
      setIsFirstLogin(true);
    }
  }, [user]);

  const pillOptions = [
    "Workout",
    "Chill",
    "Focus",
    "Party",
    "Romantic",
    "Road Trip",
    "Sad",
    "Happy",
    "Study",
    "Sleep",
    "Cooking",
    "Rainy Day",
    "Summer Vibes",
    "Throwback",
    "Late Night",
  ];

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-4 py-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">Hey {user?.username} 👋</h2>
        <p className="text-lg mb-8">
          What do you feel like listening to today?
        </p>

        <SearchBar/>


        <div className="text-sm text-white/90 mb-3">
          Can’t decide? Select from the options below
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl w-full">
          {pillOptions.map((pill, index) => (
            <Pill key={index} label={pill} />
          ))}
        </div>
      </div>

      <Modal isOpen={isFirstLogin}>
        <div className="p-6">
          {currentStep}
          {modalStep > 0 && modalStep < 5 && inputEmpty && (
            <p className="mt-[-20px] ml-[25px] text-red-500 text-sm">
              Required*
            </p>
          )}
          <div className="flex justify-center mt-6 gap-4">
            {modalStep > 1 && (
              <NavButton
                action="Back"
                handleModalNavChange={handleModalNavChange}
              />
            )}
            {modalStep >= 0 && modalStep < 5 && (
              <NavButton
                action="Next"
                handleModalNavChange={handleModalNavChange}
              />
            )}
            {modalStep === 5 && (
              <NavButton
                action="Submit"
                setIsFirstLogin={setIsFirstLogin}
                quizAnswers={quizData}
                setQuizData={setQuizData}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default page;
