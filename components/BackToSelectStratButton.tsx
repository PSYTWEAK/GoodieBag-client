import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { IconButton } from "@mui/material";
export function BackToSelectStratButton({ setStratergy }: { setStratergy: any }) {
  return (
    <IconButton aria-label="back" onClick={() => setStratergy("")}>
      <ArrowBackIosIcon />
    </IconButton>
  );
}
