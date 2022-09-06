import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useProvider, useContract, useContractWrite, useSendTransaction } from "wagmi";
import TokenEaterABI from "../contracts/TokenEaterABI.json";
import { arbiTokenEaterAddress, arbiUniswapRouterAddress, oneInch } from "../globals";
import { ethers } from "ethers";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import useGenerateCalldata from "../hooks/calldataForSwaps/useGenerateCalldata";


export function BuyTokens({ tokens, loading, slippage, amountETHIn }: { tokens: any; loading: any; slippage: number; amountETHIn: any }) {
  const provider = useProvider();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    addressOrName: arbiTokenEaterAddress,
    contractInterface: TokenEaterABI,
    functionName: "multiBuy",
  });

  const [disabled, setDisabled] = useState(true);

  const [generating, setGenerating] = useState("false");


  const txObject = useGenerateCalldata(provider, tokens, slippage, amountETHIn, generating, setGenerating);


  const handleClick = async () => {
    if (tokens) {
      setGenerating("true");
    }
  };

  useEffect(() => {
    if (amountETHIn > 0 && loading === "done" && tokens.length > 0 && generating === "false") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amountETHIn, tokens]);

  useEffect(() => {
    if (generating === "done") {
      write({
        args: [oneInch, txObject.tokenId, txObject.callData],
        overrides: {
          value: txObject.value.toString(),
          gasLimit: "30000000",
        },
      });
    }
    setGenerating("false");
  }, [generating]);

  return (
    <div>
      <Button variant="contained" onClick={handleClick} disabled={disabled}>
        Buy Tokens
      </Button>
    </div>
  );

}
