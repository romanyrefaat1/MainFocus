"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Award,
  Eye,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Loader,
  Loader2,
  LoaderCircle,
} from "lucide-react";
import { ERROR_TYPES } from "@/app/lib/utils";
import ErrorDisplay from "./ErrorDisplay";
import FrameRateControl from "./FrameRateControl";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import CountTime from "../CountTime";
import Image from "next/image";
import { CircularProgress, LinearProgress } from "@mui/material";

const Webcam = dynamic(() => import("react-webcam"), {
  ssr: false,
});

export default function FocusTracker() {
  const webcamRef = useRef(null);
  const frameProcessorRef = useRef(null);
  const [model, setModel] = useState(null);
  const [focusScore, setFocusScore] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [status, setStatus] = useState("Starting...");
  const [focusRate, setFocusRate] = useState(0);
  const [focusHistory, setFocusHistory] = useState([]);
  const [lastPointUpdate, setLastPointUpdate] = useState(0);
  const [pointTrend, setPointTrend] = useState(0);
  const [frameRate, setFrameRate] = useState(10);
  const [errorDetails, setErrorDetails] = useState({
    type: null,
    message: null,
    suggestions: [],
  });
  const consecutiveErrorsRef = useRef(0);
  const lastSuccessfulProcessRef = useRef(Date.now());
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Initialize the face detection model
  useEffect(() => {
    async function loadModel() {
      try {
        setStatus("Loading model...");
        // Load the face landmarks detection model using the new API
        const model = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: "tfjs",
            refineLandmarks: true,
            maxFaces: 1,
          }
        );
        setModel(model);
        setStatus("Model loaded");
      } catch (error) {
        console.error("Error loading model:", error);
        setErrorDetails({
          type: "MODEL_LOAD_ERROR",
          message: "Failed to load face detection model",
          suggestions: ["Refresh the page", "Check your internet connection"],
        });
      }
    }
    loadModel();
  }, []);

  const handleError = (errorType) => {
    consecutiveErrorsRef.current += 1;
    const timeSinceLastSuccess = Date.now() - lastSuccessfulProcessRef.current;

    if (consecutiveErrorsRef.current > 10 || timeSinceLastSuccess > 5000) {
      setErrorDetails({
        type: errorType,
        message: ERROR_TYPES[errorType],
        suggestions: [
          "Make sure your face is visible",
          "Check lighting conditions",
        ],
      });
    }
  };

  const calculateFocusScore = (keypoints) => {
    try {
      // Check if face is centered using the nose tip keypoint
      const noseTip = keypoints.find((point) => point.name === "noseTip");
      if (!noseTip) return 60;

      // Calculate how centered the face is
      const xCenter = Math.abs(noseTip.x / webcamRef.current.video.width - 0.5);
      const yCenter = Math.abs(
        noseTip.y / webcamRef.current.video.height - 0.5
      );

      // The closer to center, the higher the score
      const centerScore = 100 - (xCenter + yCenter) * 100;
      return Math.min(100, Math.max(0, centerScore));
    } catch (error) {
      console.error("Error calculating focus score:", error);
      return 60;
    }
  };

  const processFrame = async () => {
    if (!webcamRef.current || !model || !webcamRef.current.video) return;

    try {
      const video = webcamRef.current.video;

      // Make sure video is playing and has enough data
      if (video.readyState !== 4) return;

      const faces = await model.estimateFaces(video);

      if (faces && faces.length > 0) {
        const face = faces[0];
        const newFocusScore = calculateFocusScore(face.keypoints);

        setFocusScore(newFocusScore);
        setStatus("Face detected");
        lastSuccessfulProcessRef.current = Date.now();
        consecutiveErrorsRef.current = 0;

        // Update focus history
        setFocusHistory((prev) => [...prev.slice(-20), newFocusScore]);

        // Calculate focus rate
        const newFocusRate = Math.round(
          focusHistory.reduce((acc, val) => acc + val, 0) / focusHistory.length
        );
        setFocusRate(newFocusRate);

        // Update points
        if (Date.now() - lastPointUpdate > 5000) {
          const pointsToAdd = Math.floor(newFocusScore / 20);
          setSessionPoints((prev) => prev + pointsToAdd);
          setLastPointUpdate(Date.now());
          setPointTrend(pointsToAdd > 0 ? 1 : -1);
        }
      } else {
        setStatus("No face detected");
        handleError("NO_FACE_DETECTED");
      }
    } catch (error) {
      console.error("Frame processing error:", error);
      handleError("PROCESSING_ERROR");
    }
  };

  // Start/stop frame processing
  useEffect(() => {
    if (isTracking && model) {
      const intervalId = setInterval(processFrame, 1000 / frameRate);
      frameProcessorRef.current = intervalId;
      return () => clearInterval(intervalId);
    } else if (frameProcessorRef.current) {
      clearInterval(frameProcessorRef.current);
    }
  }, [isTracking, model, frameRate]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div
      className="mx-auto bg-back rounded-lg shadow-sm"
      style={{ maxWidth: "fit-content", maxHeight: "fit-content" }}
    >
      <div className="p-6 border-b border-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-full text-sm text-mainText">
              <TrendingUp className="w-4 h-4" />
              Focus Rate: {focusRate}%
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-full text-sm text-mainText">
              <Award className="w-4 h-4" />
              Points: {sessionPoints}
              {pointTrend !== 0 && (
                <span className="ml-1">
                  {pointTrend > 0 ? (
                    <ArrowUp className="w-4 h-4 text-main" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="relative rounded-lg overflow-hidden bg-secondary">
          <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CountTime />
          </div>
          <div className="relative opacity-3">
            {!videoLoaded && (
              <div className="relative inset-0">
                <CircularProgress className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-main z-10" />
                <Image
                  src="/camera-video-placeolder.png"
                  alt="A person looking at a screen"
                  width={1280}
                  height={720}
                  priority={true}
                  className="w-full"
                  style={{ maxHeight: "60vh" }}
                />
              </div>
            )}
            <div className={!videoLoaded ? "hidden" : ""}>
              <Webcam
                ref={webcamRef}
                audio={false}
                className="w-full"
                mirrored={true}
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
                style={{ maxHeight: "60vh" }}
                onLoadedData={handleVideoLoaded}
              />
            </div>
            {!model && (
              <div className="absolute bottom-0 left-0 right-0 w-full">
                <LinearProgress className="w-full" />
              </div>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-back/90 rounded-full text-sm text-mainText bg-back">
              <Eye className="w-4 h-4" />
              {status}
            </div>
          </div>
        </div>

        <ErrorDisplay errorDetails={errorDetails} />

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-mainText">
              <span>Current Focus</span>
              <span className="font-bold">{focusScore}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${focusScore}%`,
                  backgroundColor: "var(--main-color)",
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-mainText">
              <span>Focus Rate</span>
              <span className="font-bold">{focusRate}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${focusRate}%`,
                  backgroundColor: "var(--main-color)",
                }}
              />
            </div>
          </div>
        </div>

        <FrameRateControl frameRate={frameRate} onChange={setFrameRate} />

        <button
          onClick={() => setIsTracking(!isTracking)}
          className={`w-full p-2 rounded-md ${
            isTracking
              ? "bg-red-500 hover:bg-red-600"
              : "bg-main hover:bg-mainDark"
          } text-back transition-colors`}
          disabled={
            !!errorDetails.type && errorDetails.type === "MODEL_LOAD_ERROR"
          }
        >
          {isTracking ? "Stop Tracking" : "Start Tracking"}
        </button>
      </div>
    </div>
  );
}
