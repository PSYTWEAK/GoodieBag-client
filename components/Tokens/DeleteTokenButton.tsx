import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/Home.module.css";
import { IconButton } from "@mui/material";

export function DeleteTokenButton({ token, removeToken }: { token: any, removeToken: any }) {

  if (token.hasCalldata === "null") {
    return (
      <div className={styles.remove}>
        <IconButton aria-label="delete" onClick={() => removeToken()}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  } else {
    return <></>
  }
}
