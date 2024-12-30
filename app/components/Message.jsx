"use client";
import React, { useState } from "react";
import EditCountBtn from "./EditCountBtn";
import DynamicInput from "./DynamicInput";

export default function Message() {
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState(
    `You will start a 25:00 pomodoro, keep up the good work!`
  );
  return (
    <div className="relative group mt-10 text-secondaryText">
      <EditCountBtn top={-15} size={`small`} onClick={() => setIsInput((prev) => !prev)} />
      {isInput ? (
        <DynamicInput inputVal={value} setInputVal={setValue} isNum={false} />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
