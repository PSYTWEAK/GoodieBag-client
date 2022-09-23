import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { TextField } from "@mui/material";
import ETHIcon from "../ETHIcon";
import useGenerateCalldata from "../../hooks/calldataForSwaps/useGenerateCalldata";
export function EtherInput({ amountETHIn, setAmountETHIn }: { amountETHIn: any; setAmountETHIn: any }) {
  const { txObject, generateCallData } = useGenerateCalldata();

  const [storedAmountETHIn, setStoredAmountETHIn] = useState("");

  useEffect(() => {
    // wait 1 second and then do something
    const timer = setTimeout(() => {
      setStoredAmountETHIn(amountETHIn);
    } // 1 second
      , 1000);

  }, [amountETHIn]);

  useEffect(() => {

    if (storedAmountETHIn === amountETHIn) {
      console.log(storedAmountETHIn)
    }


  }, [storedAmountETHIn]);


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
        <ETHIcon />
      </div>{" "}
    </>
  );
}
