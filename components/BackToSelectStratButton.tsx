import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { IconButton } from "@mui/material";
export function BackToSelectStratButton({ setConfig }: { setConfig: any }) {
  return (
    <IconButton aria-label="back" onClick={() => setConfig((prevState: any) => {
      return { ...prevState, stratergy: "" };
    })}>
      <ArrowBackIosIcon />
    </IconButton>
  );
}
