"use client";
import React, { useState, useRef, useEffect } from "react";
import EditCountBtn from "./EditCountBtn";
import DynamicInput from "./DynamicInput";

export default function Message() {
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState(
    `You will start a 25:00 pomodoro, keep up the good work!`
  );
  const textareaRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const span = spanRef.current;
    if (textarea && span) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      span.textContent = value;
    }
  }, [value]);

  return (
    <div className="relative group mt-10 text-secondaryText max-w-[80vw] mx-auto">
      <span
        ref={spanRef}
        className="absolute invisible whitespace-pre-wrap break-words"
        aria-hidden="true"
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-transparent outline-none resize-none overflow-hidden whitespace-pre-wrap break-words text-center"
      />
    </div>
  );
}
