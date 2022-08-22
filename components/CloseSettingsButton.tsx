import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { IconButton } from "@mui/material";
export function CloseSettingsButton({ setSettingsActive }: { setSettingsActive: any }) {
  return (
    <IconButton aria-label="back" onClick={() => setSettingsActive(false)}>
      <ArrowBackIosIcon />
    </IconButton>
  );
}
