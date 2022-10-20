import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import { IconButton } from "@mui/material";
export function SettingsButton({ setSettingsActive }: { setSettingsActive: any }) {
  return (
    <IconButton aria-label="settings" style={{

      color: "rgba(118,126,141,255)",
    }} onClick={() => setSettingsActive(true)}>
      <SettingsIcon />
    </IconButton>
  );
}
