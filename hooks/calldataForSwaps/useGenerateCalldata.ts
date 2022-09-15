import JSBI from "jsbi";
import { BigNumber, ethers } from "ethers";
import { oneInch } from "./externalTxBuilders/oneInch";
import { uniswap } from "./externalTxBuilders/uniswap";
import { sushi } from "./localTxBuilders/sushiswap";
import { useEffect, useState } from "react";

// This hook is used to generate the calldata for the swaps for every token and split the total amount in between them
// It also checks if the slippage is too high and if so, it will use the localTxBuilders
// The localTxBuilders are used to generate the calldata for the swaps for tokens that are not supported by 1inch or have a slippage too high



export default function useGenerateCalldata() {

  const [txObject, setTxObject] = useState({
    router: [],
    callData: [],
    tokenId: [],
    value: JSBI.BigInt(0),
    completed: false,
  });



  return { txObject, setTxObject };
}


function amountInPerTrade(totalAmountIn: any, tokens: any) {
  const totalAmountInBN = JSBI.BigInt(totalAmountIn.toString());
  const amountPerTrade = JSBI.divide(totalAmountInBN, JSBI.BigInt(tokens.length));
  return amountPerTrade;
}
