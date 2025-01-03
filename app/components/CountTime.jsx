"use client";
import { Edit, Refresh } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import MainBtn from "./MainBtn";
import EditCountBtn from "./EditCountBtn";
import DynamicInput from "./DynamicInput";
import InputModal from "./InputModal";
import playMusic from "../lib/playMusic";

export default function CountTime({ fontSize }) {
  const [isStarted, setIsStarted] = useState(false);
  const [btnText, setBtnText] = useState(`Start`);
  const [isEdit, setIsEdit] = useState(false);
  const [isAllowedToEdit, setIsAllowedToEdit] = useState(true);
  const [minVal, setMinVal] = useState(25);
  const [secVal, setSecVal] = useState(0);
  const [initialMinVal, setInitialMinVal] = useState(25);
  const [initialSecVal, setInitialSecVal] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const pomodoroTime = minVal * 60 + secVal;

  useEffect(() => {
    console.log(`minVal: ${minVal}`);
  }, [minVal]);

  const createExpiryTimestamp = (seconds) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  };

  const { seconds, minutes, pause, restart, resume } = useTimer({
    expiryTimestamp: createExpiryTimestamp(pomodoroTime),
    onExpire: () => {
      playMusic();
      // alert("Pomodoro session ended!");
      toast.success(`You have completed a session!`);
    },
    autoStart: false,
  });

  const handleStart = () => {
    if (!isPaused && !isStarted) {
      // Fresh start
      setInitialMinVal(minVal);
      setInitialSecVal(secVal);
      const totalSeconds = minVal * 60 + secVal;
      restart(createExpiryTimestamp(totalSeconds), true);
    } else {
      // Resuming from pause
      resume();
    }
    setIsPaused(false);
    setIsStarted(true);
    setIsEdit(false);
    setIsAllowedToEdit(false);
    setBtnText("Resume");
  };

  // Pause the timer
  const handlePause = () => {
    pause();
    setIsPaused(true);
    setIsStarted(false);
    setBtnText("Resume");
  };

  // Reset timer
  const resetTimer = () => {
    const totalSeconds = initialMinVal * 60 + initialSecVal;
    restart(createExpiryTimestamp(totalSeconds), false);
    setIsStarted(false);
    setBtnText(`Start`);
    setIsAllowedToEdit(true);
  };

  const handleEditCount = () => {
    if (!isStarted && isAllowedToEdit) {
      setIsEdit(true);
    }
  };

  return (
    <div className="flex flex-col items-center align-center space-y-4 select-none">
      <div
        className={`font-bold relative group ${
          !isEdit ? "cursor-pointer" : "cursor-default"
        } ${
          !isStarted && !isEdit
            ? "text-mainText hover:text-secondaryText"
            : "text-secondaryText"
        } transition-colors duration-300`}
        style={{
          fontSize: "clamp(7rem, 15vw, 15rem)",
        }}
        onClick={handleEditCount}
      >
        {/* {isAllowedToEdit && (
          <EditCountBtn
            top={-0}
            size="big"
            onClick={() => setIsEdit((prev) => !prev)}
          />
        )} */}
        {isEdit && (
          <div className="fixed p-[10px] rounded flex flex-col gap-5 z-10 rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary shadow-lg">
            <InputModal
              inputMinVal={minVal}
              setInputMinVal={setMinVal}
              inputSecVal={secVal}
              setInputSecVal={setSecVal}
              setIsSow={setIsEdit}
              onSave={(min, sec) => {
                const totalSeconds = min * 60 + sec;
                restart(createExpiryTimestamp(totalSeconds), false);
              }}
            />
          </div>
        )}
        <span>{String(minutes).padStart(2, `0`)}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
      <div className="space-x-4">
        {!isStarted ? (
          <MainBtn onClick={handleStart} text={btnText} />
        ) : (
          <MainBtn
            onClick={handlePause}
            backColor="var(--secondaryText-color)"
            backDarkerColor="var(--secondaryText-color)"
            text="Pause"
          />
        )}

        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          <Refresh />
        </button>
      </div>
    </div>
  );
}
