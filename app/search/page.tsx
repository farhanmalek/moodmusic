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

const page = () => {
  const { user, setUser } = useUserStore();
  const [hydrated, setHydrated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<number>(0);

  const modalStepMap: Record<number, React.ReactElement> = {
    0: <IntroQuiz />,
    1: <Language />,
    2: <TimePeriod />,
    3: <ListenPreference />,
    4: <Artists />,
    5: <FinishedQuiz />,
  };

  const currentStep = modalStepMap[modalStep];

  const handleModalNavChange = (action: string) => {
    if (action === "Back") {
      setModalStep((prev) => prev - 1);
    }

    if (action === "Next") {
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

  return (
    <>
      <div className="h-[100vh] flex justify-center items-center border">
        Normal Search page content
      </div>
      <Modal isOpen={isFirstLogin}>
        {currentStep}
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
          {modalStep === 5 && <NavButton action="Submit" setIsFirstLogin={setIsFirstLogin}/>}
        </div>
      </Modal>
    </>
  );
};

export default page;
