"use client";
import { toast } from 'react-toastify';
import { Edit, Refresh } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import MainBtn from "./MainBtn";
import EditCountBtn from "./EditCountBtn";
import DynamicInput from "./DynamicInput";
import InputModal from "./InputModal";
import playMusic from "../lib/playMusic";

export default function CountTime() {
  const [isStarted, setIsStarted] = useState(false);
  const [btnText, setBtnText] = useState(`Start`);
  const [isEdit, setIsEdit] = useState(false);
  const [isAllowedToEdit, setIsAllowedToEdit] = useState(true);
  const [minVal, setMinVal] = useState(25);
  const [secVal, setSecVal] = useState(0);
  const [initialMinVal, setInitialMinVal] = useState(25);
  const [initialSecVal, setInitialSecVal] = useState(0);

  const pomodoroTime = minVal * 60 + secVal

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
        playMusic()
        // alert("Pomodoro session ended!");
        toast.success(`You`)
      },
      autoStart: false,
    });

  const handleStart = () => {
    setInitialMinVal(minVal);
    setInitialSecVal(secVal);
    if (!isStarted) {
      const totalSeconds = minVal * 60 + secVal;
      restart(createExpiryTimestamp(totalSeconds), true);
    } else {
      resume();
    }
    setIsStarted(true);
    setIsEdit(false);
    setIsAllowedToEdit(false);
  };

  // Pause the timer
  const handlePause = () => {
    pause();
    setBtnText(`Resume`);
    setIsStarted(false);
  };

  // Reset timer
  const resetTimer = () => {
    const totalSeconds = initialMinVal * 60 + initialSecVal;
    restart(createExpiryTimestamp(totalSeconds), false);
    setIsStarted(false);
    setBtnText(`Start`);
    setIsAllowedToEdit(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-[120px] font-bold relative group">
        {isAllowedToEdit && (
          <EditCountBtn top={-0} size='big' onClick={() => setIsEdit((prev) => !prev)} />
        )}
        {isEdit && (
          <InputModal
            inputMinVal={minVal}
            setInputMinVal={setMinVal}
            inputSecVal={secVal}
            setInputSecVal={setSecVal}
            setIsSow={setIsEdit}
          />
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
