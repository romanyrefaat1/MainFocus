"use client";
import React, { useEffect, useState } from "react";
import DynamicInput from "./DynamicInput";
import MainBtn from "./MainBtn";
import Link from "next/link";

export default function InputModal(props) {
  const { setIsSow, setInputMinVal, setInputSecVal } = props;
  const [minVal, setMinVal] = useState(props.inputMinVal);
  const [secVal, setSecVal] = useState(props.inputSecVal);
  useEffect(() => console.log(`MinVAl:`, minVal), [minVal]);
  
  function handleSave() {
    setIsSow(false);
    setInputMinVal(minVal);
    setInputSecVal(secVal);
    props.onSave?.(minVal, secVal);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSave();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [minVal, secVal]);

  return (
    <div className="fixed p-[20px] rounded flex flex-col gap-5 z-1000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary shadow-lg w-[80vw] max-w-[850px]">
      <h2 className="text-[40px] mb-[20px] text-mainText">
        Adjust the timer!{" "}
        <span className="text-[20px] font-[500] text-[#8A8A8A]">
          Or start a new{" "}
          <Link
            href={`/session`}
            className="border-b pb-[2px] hover:border-b-2 transition-all"
          >
            Session
          </Link>
        </span>
      </h2>
      <div className="flex justify-center gap-4">
        <DynamicInput
          inputVal={minVal}
          setInputVal={setMinVal}
          min={0}
          max={60}
          isNum={true}
        />
        <DynamicInput
          inputVal={secVal}
          setInputVal={setSecVal}
          min={0}
          max={60}
          isNum={true}
        />
      </div>
      <MainBtn text={`Save`} onClick={handleSave} />
    </div>
  );
}
