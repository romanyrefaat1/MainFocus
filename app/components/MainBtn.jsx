import { Button } from "@mui/material";
import React from "react";

export default function MainBtn({
  text = `placeholder text`,
  roundness = "10px",
  classList = "",
  onClick,
  pInline = 6,
  pBlock = 1.5,
  variant = "contained",
  backColor = `var(--main-color)`,
  backDarkerColor = `var(--main-dark-color)`,
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick || (() => {})}
      className={`
        rounded
        bg-[${mainColor}]
        text-back
        font-bold
        py-[${pBlock * 8}px]
        px-[${pInline * 8}px]
        hover:bg-[${backDarkerColor}]
        ${classList}
      `}
    >
      {text}
    </Button>
  );
}
