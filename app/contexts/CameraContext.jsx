"use client";

import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";

const CameraContext = createContext();

export const useCameraContext = () => useContext(CameraContext);

export const CameraProvider = ({ children }) => {
  const [streamStarted, setStreamStarted] = useState(null);
  const [srcObject, setSrcObj] = useState(null);
  const [stream, setStream] = useState(null);
  const [isTojjleOn, setIsTojjleOn] = useState(false);

  return (
    <CameraContext.Provider
      value={{
        streamStarted,
        setStreamStarted,
        srcObject,
        setSrcObj,
        stream,
        setStream,
        isTojjleOn,
        setIsTojjleOn,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
