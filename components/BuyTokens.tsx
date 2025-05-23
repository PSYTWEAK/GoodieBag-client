import { TxResponse } from './TxResponse';
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useProvider, useContract, useContractWrite, useSendTransaction } from "wagmi";
import GoodieBagABI from "../contracts/GoodieBagABI.json";
import { arbiGoodieBagAddress } from "../globals";
import styles from '../styles/Home.module.css';



export function BuyTokens({ state, loading, txObject }: { state: any; loading: any; txObject: any }) {

  const { data, isLoading, isSuccess, write } = useContractWrite({
    addressOrName: arbiGoodieBagAddress,
    contractInterface: GoodieBagABI,
    functionName: "multiBuy",
  });

  const [disabled, setDisabled] = useState(true);

  const handleClick = async () => {
    if (txObject.completed === true) {
      write({
        args: [txObject.router, txObject.tokenId, txObject.callData, false],
        overrides: {
          value: txObject.value.toString(),
          gasLimit: "60000000",
        },
      });
    }
  };

  useEffect(() => {
    if (state.amountETHIn > 0
      && loading === "done"
      && state.tokens
      && state.tokens.length > 0
      && txObject.completed === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [state.amountETHIn, state.tokens, loading, txObject.completed]);

  return (
    <>
      <div>
        <Button className={styles.buyButton} variant="contained" onClick={handleClick} disabled={disabled}>
          Buy Tokens
        </Button>
      </div>
      <TxResponse isSuccess={isSuccess} data={data} />
    </>
  );

}
