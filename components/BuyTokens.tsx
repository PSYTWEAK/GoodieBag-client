import React from "react";
import { Button } from "@mui/material";
import useUniswapTrade from "../hooks/useUniswapTrade";
import { useProvider } from "wagmi";
export function BuyTokens({ pools, loading, amountETHIn }: { pools: any; loading: any; amountETHIn: number }) {
  const provider = useProvider();

  const handleClick = () => {
    if (pools) {
      useUniswapTrade(provider, pools, amountETHIn);
    }
  };
  return (
    <Button variant="contained" onClick={() => handleClick()}>
      Buy Tokens
    </Button>
  );
}
