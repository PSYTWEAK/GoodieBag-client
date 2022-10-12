import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { IconButton } from "@mui/material";
export function BackToSelectStratButton({ setConfig, setState }: { setConfig: any; setState: any }) {

  function handleClick() {
    setConfig((prevState: any) => {
      return { ...prevState, stratergy: "" };
    });
    setState((prevState: any) => {
      return { ...prevState, amountETHIn: null, tokens: [] };
    })
  }

  return (
    <IconButton aria-label="back" onClick={() => handleClick()}>
      <ArrowBackIosIcon />
    </IconButton>
  );
}
