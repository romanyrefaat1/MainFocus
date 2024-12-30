"use client";

import { useCameraContext } from "../contexts/CameraContext";
import AndleStartCamera from "./StartCameraTojjle";
import andleStartCamera from "./StartCameraTojjle";

const constraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    },
  },
};

export default function Buttons() {
  const { streamStarted, setStreamStarted, setStream } = useCameraContext();

  const handleStream = (stream) => {
    setStream(stream);
    setStreamStarted(true);
    console.log(`andleStream buttons`);
  };
  const startStream = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(`startStream buttons`);

    handleStream(stream);
  };

  const handlePlay = () => {
    if (streamStarted) {
      setStreamStarted(false);
      play.classList.add("d-none");
      pause.classList.remove("d-none");
      setStreamStarted(true);

      return;
    } else {
      if ("mediaDevices" in navigator && navigator.mediaDevices.getUserMedia) {
        startStream(constraints);
        console.log(`StartStream`)
      }
    }
  };

  function andlePause() {
    setStreamStarted(false);
  }
  return (
    <>
      <button className="btn btn-danger play" onClick={andleStartCamera} title="Play">
        play
      </button>
      <button
        className="btn btn-info pause d-none"
        onClick={andlePause}
        title="Pause"
      >
        pause
      </button>
      <button
        className="btn btn-outline-success screenshot d-none"
        title="ScreenShot"
      >
       ScreenShot
      </button>
    </>
  );
}
