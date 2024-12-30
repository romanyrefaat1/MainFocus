import { Edit } from "@mui/icons-material";
import React from "react";

export default function EditCountBtn({ onClick, top, size = `default` }) {
  return (
    <button
      className={`absolute right-[0px] text-secondaryText h-fit opacity-0 group-hover:opacity-100 transition-opacity w-2 h-2 text-sm`}
      style={{ top: `${top}px` }}
      onClick={onClick}
    >
      <Edit fontSize={size}/>
    </button>
  );
}
