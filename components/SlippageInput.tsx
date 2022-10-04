import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { TextField, InputAdornment } from "@mui/material";

export function SlippageInput({ slippage, setConfig }: { slippage: any; setConfig: any }) {
  return (
    <div>
      <TextField
        type="number"
        InputProps={{
          inputProps: {
            max: 100,
            min: 10,
          },
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        label="Slippage"
        placeholder="%"
        value={slippage}
        onChange={(e: any) => {
          setConfig((prevState: any) => { return { ...prevState, slippage: e.target.value } });
        }}
        className={styles.select}
      />
    </div>
  );
}
