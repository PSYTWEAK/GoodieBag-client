import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useUniswapTrade from "../hooks/useUniswapTrade";
import { useProvider } from "wagmi";
export function BuyTokens({ pools, loading, amountETHIn }: { pools: any; loading: any; amountETHIn: any }) {
  const provider = useProvider();

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (amountETHIn > 0 && loading === "true" && pools) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amountETHIn, pools]);

  return (
    <Button variant="contained" onClick={() => handleClick(provider, pools, amountETHIn)} disabled={disabled}>
      Buy Tokens
    </Button>
  );
}
const handleClick = (provider: any, pools: any, amountETHIn: number) => {
  if (pools) {
    useUniswapTrade(provider, pools, amountETHIn);
  }
};
