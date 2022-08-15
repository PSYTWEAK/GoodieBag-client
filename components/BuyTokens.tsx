import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useUniswapTrade from "../hooks/useUniswapTrade";
import { useProvider, useContract, useContractWrite, useSendTransaction } from "wagmi";
import TokenEaterABI from "../contracts/TokenEaterABI.json";
import { arbiTokenEaterAddress, arbiUniswapRouterAddress } from "../globals";
import { ethers } from "ethers";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
export function BuyTokens({ tokens, loading, slippage, amountETHIn }: { tokens: any; loading: any; slippage: number; amountETHIn: any }) {
  const provider = useProvider();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    addressOrName: arbiTokenEaterAddress,
    contractInterface: TokenEaterABI,
    functionName: "eatTokensWithETH",
  });

  const [disabled, setDisabled] = useState(true);

  const handleClick = async (provider: any, tokens: any, amountETHIn: number) => {
    if (tokens) {
      let [value, tokenId, callData] = await useUniswapTrade(provider, tokens, slippage, ethers.utils.parseEther(amountETHIn.toString()));
      await write({
        args: [tokenId, callData],
        overrides: {
          value: value.toString(),
          gasLimit: "30000000",
        },
      });
    }
  };

  useEffect(() => {
    if (amountETHIn > 0 && loading === "true" && tokens) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amountETHIn, tokens]);

  return (
    <Button variant="contained" onClick={() => handleClick(provider, tokens, amountETHIn)} disabled={disabled}>
      Buy Tokens
    </Button>
  );
}
