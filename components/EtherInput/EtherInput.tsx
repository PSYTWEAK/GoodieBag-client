import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { TextField } from "@mui/material";
import ETHIcon from "../ETHIcon";
import useGenerateCalldata from "../../hooks/calldataForSwaps/useGenerateCalldata";
import { useProvider } from "wagmi";

export function EtherInput({ amountETHIn, setAmountETHIn, tokens, setTokens, slippage }: { amountETHIn: any; setAmountETHIn: any; tokens: any; setTokens: any; slippage: any; }) {
  const provider = useProvider();

  const { txObject, generateCallData } = useGenerateCalldata();

  const [storedAmountETHIn, setStoredAmountETHIn] = useState("");


  // when amountETHIn is updated the useEffect waits 1 second before updating the storedAmountETHIn
  // this creates a delay between when the user types and when the calldata is generated

  useEffect(() => {
    setTimeout(() => {
      setStoredAmountETHIn(amountETHIn);
    }
      , 1000);

  }, [amountETHIn]);

  useEffect(() => {
    if (storedAmountETHIn === amountETHIn && tokens) {
      generateCallData({
        provider,
        tokens,
        setTokens,
        slippage,
        amountETHIn,
      })

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
