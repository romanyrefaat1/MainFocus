"use client";

import { useState } from "react";
import { useCameraContext } from "../contexts/CameraContext";
import StartCameraTojjle from "./StartCameraTojjle";
import Image from "next/image";
import CountTime from "../components/CountTime";
import { LinearProgress } from "@mui/material";
import Video from "./Video";

export default function CameraComponent() {
  const { streamStarted } = useCameraContext();
  const [isCameraLoadin, setIsCameraLoadin] = useState(false);

  return (
    <div className={`bg-secondary w-[80%] opacity-70 relative rounded`}>
      <div className="absolute top-1/2 left-1/2 transform z-10 -translate-x-1/2 -translate-y-1/2">
        <CountTime />
      </div>
      <div className="absolute top-0 left-0 flex justify-between align-center w-full z-10">
        <StartCameraTojjle
          isLoadin={isCameraLoadin}
          isLinkToCamera={false}
          setIsLoadin={setIsCameraLoadin}
        />
        <div className="bg-main p-2 rounded-full text-back font-medium text-xs flex items-center align-center">
          <span>100+</span>
        </div>
      </div>
      {streamStarted && (
        <Video />
      )}
      {!streamStarted && (
        <Image
          src={`https://imagingedge.sony.net/img/iewebcam/pc/PC_Webcam_M_1.jpg`}
          alt={`placeholder image of a guy focusing`}
          width={1080}
          height={720}
          priority={false}
        />
      )}
      {isCameraLoadin && <LinearProgress />}
    </div>
  );
}
