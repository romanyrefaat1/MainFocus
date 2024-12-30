"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCameraContext } from "../contexts/CameraContext";

export default function Tojjle({ label, onTojjle, isLinkToCamera }) {
  const { isTojjleOn, setIsTojjleOn } = useCameraContext();

  useEffect(() => {
    if (!isLinkToCamera) {
      setIsTojjleOn(true);
      onTojjle && onTojjle();
    }
    // setIsTojjleOn(true)
  }, []);

  const handleToggle = () => {
    setIsTojjleOn((prev) => !prev);
    {
      onTojjle && onTojjle();
    }
  };

  return (
    <div className="flex w-[fit-content] rounded items-center gap-2 p-4">
      <p className="">{label}</p>
      <Link
        href={isLinkToCamera ? (!isTojjleOn ? `/camera` : `/`) : ``}
        onClick={() => handleToggle()}
      >
        <label
          htmlFor="toggleTwo"
          className="flex items-center cursor-pointer select-none"
        >
          <div className="relative">
            <input
              type="checkbox"
              id="toggleTwo"
              className="peer sr-only"
              checked={isTojjleOn}
              onChange={handleToggle}
            />
            {/* Background of the toggle button */}
            <div
              className={`block h-5 rounded-full w-10 ${
                isTojjleOn ? "bg-main" : "bg-secondaryText"
              }`}
            ></div>
            {/* Circle inside the toggle button */}
            <div
              className={`absolute w-3 h-3 transition bg-mainText rounded-full left-1 top-1 peer-checked:translate-x-full peer-checked:bg-mainText`}
            ></div>
          </div>
        </label>
      </Link>
    </div>
  );
}
