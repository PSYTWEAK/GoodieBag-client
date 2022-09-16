import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../styles/Home.module.css";
import { IconButton } from "@mui/material";

export function DeleteTokenButton({ data, removeToken }: { data: any, removeToken: any }) {

  if (data.hasCalldata === "null") {
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
