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
  backDarkerColor = `var(--main-dark-color)`
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick || (() => {})}
      sx={{
        borderRadius: roundness,
        backgroundColor: backColor,
        color: 'var(--back-color)',
        padding: `${pBlock * 8}px ${pInline * 8}px`,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: backDarkerColor, 
        },
        ...classList
      }}
    >
      {text}
    </Button>
  );
}