import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useProvider, useContract, useContractWrite, useSendTransaction } from "wagmi";
import GoodieBagABI from "../contracts/GoodieBagABI.json";
import { arbiGoodieBagAddress } from "../globals";
import useGenerateCalldata from "../hooks/calldataForSwaps/useGenerateCalldata";


export function BuyTokens({ tokens, loading, amountETHIn, txObject }: { tokens: any; loading: any; amountETHIn: any, txObject: any }) {

  const { data, isLoading, isSuccess, write } = useContractWrite({
    addressOrName: arbiGoodieBagAddress,
    contractInterface: GoodieBagABI,
    functionName: "multiBuy",
  });

  const [disabled, setDisabled] = useState(true);

  const handleClick = async () => {
    if (txObject.completed === true) {
      write({
        args: [txObject.router, txObject.tokenId, txObject.callData],
        overrides: {
          value: txObject.value.toString(),
          gasLimit: "60000000",
        },
      });
    }
  };

  useEffect(() => {
    if (amountETHIn > 0
      && loading === "done"
      && tokens.length > 0
      && txObject.completed === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amountETHIn, tokens, loading, txObject.completed]);

  return (
    <div>
      <Button variant="contained" onClick={handleClick} disabled={disabled}>
        Buy Tokens
      </Button>
    </div>
  );

}
