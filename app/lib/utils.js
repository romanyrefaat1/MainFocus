import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ERROR_TYPES = {
  NO_CAMERA: {
    message: "Cannot access camera",
    suggestions: [
      "Allow camera access in your browser settings",
      "Check if another application is using the camera",
      "Try reconnecting your webcam",
    ],
  },
  POOR_LIGHTING: {
    message: "Poor lighting conditions detected",
    suggestions: [
      "Increase room lighting",
      "Avoid strong backlighting",
      "Face a light source directly",
    ],
  },
  FACE_NOT_DETECTED: {
    message: "Cannot detect face",
    suggestions: [
      "Position yourself directly in front of the camera",
      "Ensure your face is well-lit",
      "Remove any face coverings",
      "Adjust your distance from the camera (50-70cm ideal)",
    ],
  },
  MODEL_LOAD_ERROR: {
    message: "Failed to load AI model",
    suggestions: [
      "Check your internet connection",
      "Clear browser cache and reload",
      "Try using a different browser",
      "Ensure JavaScript is enabled",
    ],
  },
  PERFORMANCE_ISSUE: {
    message: "Performance issues detected",
    suggestions: [
      "Lower the frame rate in settings",
      "Close other browser tabs",
      "Reduce browser extensions",
      "Consider using a more powerful device",
    ],
  },
};

export const calculateBrightness = (video) => {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let brightness = 0;

    for (let i = 0; i < data.length; i += 20) {
      brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }

    return brightness / (data.length / 20);
  } catch (error) {
    console.error("Error calculating brightness:", error);
    return null;
  }
};
