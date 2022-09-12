import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useProvider, useContract, useContractWrite, useSendTransaction } from "wagmi";
import GoodieBagABI from "../contracts/GoodieBagABI.json";
import { arbiGoodieBagAddress } from "../globals";
import useGenerateCalldata from "../hooks/calldataForSwaps/useGenerateCalldata";


export function BuyTokens({ tokens, loading, slippage, amountETHIn }: { tokens: any; loading: any; slippage: number; amountETHIn: any }) {
  const provider = useProvider();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    addressOrName: arbiGoodieBagAddress,
    contractInterface: GoodieBagABI,
    functionName: "multiBuy",
  });

  const [disabled, setDisabled] = useState(true);

  const [generating, setGenerating] = useState("false");


  const txObject = useGenerateCalldata(provider, tokens, slippage, amountETHIn, generating, setGenerating);


  const handleClick = async () => {
    if (tokens && generating === "false") {
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
        args: [txObject.router, txObject.tokenId, txObject.callData],
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
