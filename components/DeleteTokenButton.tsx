import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "@mui/material";
export function DeleteTokenButton({ removeToken }: { removeToken: any }) {
  return (
    <IconButton aria-label="delete" onClick={() => removeToken()}>
      <CloseIcon />
    </IconButton>
  );
}
