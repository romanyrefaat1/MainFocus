"use client";

import { useEffect, useState } from "react";

export default function Options() {
  const [videoDevices, setVideoDevices] = useState([]);

  useEffect(() => {
    const fetchVideoDevices = async () => {
      try {
        if (navigator.mediaDevices?.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoInputDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          setVideoDevices(videoInputDevices);
        } else {
          console.log("Media devices are not supported.");
        }
      } catch (error) {
        console.error("Error fetching video devices:", error);
      }
    };

    fetchVideoDevices();
  }, []);

  console.log(videoDevices);
  return (
    <div>
      <select
        name="camera"
        id="camera"
        className="bg-[white] custom-select text-[black]"
      >
        <option value="">Select camera</option>
        {videoDevices &&
          videoDevices.map((device) => (
            <option value={device.deviceId} key={device.deviceId}>
              {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
            </option>
          ))}
      </select>
    </div>
  );
}
