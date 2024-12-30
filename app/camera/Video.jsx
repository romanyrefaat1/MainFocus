"use client";
import { useRef } from "react";
import { useCameraContext } from "../contexts/CameraContext";

export default function Video() {
  const videoRef = useRef();
  const { stream } = useCameraContext();

  if (stream && videoRef.current) {
    videoRef.current.srcObject = stream;
    console.log("Camera stream is active.");
  }
  return (<video ref={videoRef} autoPlay className={`w-[100%] rounded`}></video>);
}
