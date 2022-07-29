import React, { useState } from "react";
import EtherAmount from "./EtherAmount";
import styles from "../../styles/Home.module.css";
import { TextField } from "@mui/material";
export function EtherInput({ amountETHIn, setAmountETHIn }: { amountETHIn: any; setAmountETHIn: any }) {
  return (
    <>
      {" "}
      <div className={styles.grid}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="0.00"
          value={amountETHIn}
          onChange={(e: any) => {
            setAmountETHIn(e.target.value);
          }}
        />
        <p>ETH</p>
      </div>{" "}
    </>
  );
}
