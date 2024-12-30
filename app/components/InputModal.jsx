"use client"
import React, { useEffect, useState } from "react";
import DynamicInput from "./DynamicInput";
import MainBtn from "./MainBtn";

export default function InputModal(props) {
  const { setIsSow, setInputMinVal, setInputSecVal } = props;
  const [minVal, setMinVal] = useState(props.inputMinVal)
  const [secVal, setSecVal] = useState(props.inputSecVal)
  useEffect(()=> console.log(`MinVAl:`,minVal),[minVal])
  function andleSave() {
    setIsSow(false);
    setInputMinVal(minVal);
    setInputSecVal(secVal);
    console.log(`save`)
  }
  return (
    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary ">
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
      <MainBtn text={`Save`} onClick={andleSave} />
    </div>
  );
}
