import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useProvider, useContract, useContractWrite, useSendTransaction } from "wagmi";
import GoodieBagABI from "../contracts/GoodieBagABI.json";
import { arbiGoodieBagAddress } from "../globals";
import useGenerateCalldata from "../hooks/calldataForSwaps/useGenerateCalldata";


export function BuyTokens({ tokens, setTokens, loading, slippage, amountETHIn, generatingCalldata, setGeneratingCalldata }: { tokens: any; setTokens: any; loading: any; slippage: number; amountETHIn: any, generatingCalldata: string, setGeneratingCalldata: any }) {
  const provider = useProvider();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    addressOrName: arbiGoodieBagAddress,
    contractInterface: GoodieBagABI,
    functionName: "multiBuy",
  });

  const [disabled, setDisabled] = useState(true);

  const { txObject, generateCallData } = useGenerateCalldata();

  const handleClick = async () => {
    if (tokens) {
      generateCallData({
        provider,
        tokens,
        setTokens,
        slippage,
        amountETHIn,
      })
    }
  };

  useEffect(() => {
    if (amountETHIn > 0
      && loading === "done"
      && tokens.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amountETHIn, tokens, loading]);

  useEffect(() => {
    if (txObject.completed === true) {
      write({
        args: [txObject.router, txObject.tokenId, txObject.callData],
        overrides: {
          value: txObject.value.toString(),
          gasLimit: "30000000",
        },
      });
    }
  }, [txObject.completed, txObject.router, txObject.tokenId, txObject.callData, txObject.value, write]);

  return (
    <div>
      <Button variant="contained" onClick={handleClick} disabled={disabled}>
        Buy Tokens
      </Button>
    </div>
  );

}
