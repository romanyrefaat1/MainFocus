"use client";
import { useState } from "react";
import Tojjle from "../components/Tojjle";
import { useCameraContext } from "../contexts/CameraContext";

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
export default function StartCameraTojjle({ setIsLoadin, isLinkToCamera }) {
  const { streamStarted, stream, setStreamStarted, setStream } =
    useCameraContext();
  const { isTojjleOn } = useCameraContext();
  const [isActive, setIsActive] = useState(isTojjleOn);

  const handleStream = (stream) => {
    setStream(stream);
    setStreamStarted(true);
    console.log(`andleStream buttons`);
  };
  const startStream = async () => {
    {
      setIsLoadin && setIsLoadin(true);
    }
    const stream = await navigator?.mediaDevices?.getUserMedia(constraints);
    {
      setIsLoadin && setIsLoadin(false);
    }
    console.log(`startStream buttons`);
    setIsActive(true);

    handleStream(stream);
  };

  const pauseStream = () => {
    if (streamStarted) {
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());
      setStreamStarted(false);
      setIsActive(false);
      console.log("Camera paused");
    }
  };

  const tojjleStream = () => {
    if (isActive) {
      pauseStream();
    } else {
      startStream();
    }
  };

  return <Tojjle isLinkToCamera={isLinkToCamera} onTojjle={tojjleStream} />;
}
