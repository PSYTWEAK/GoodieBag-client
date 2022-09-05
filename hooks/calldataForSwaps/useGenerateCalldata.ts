import JSBI from "jsbi";
import { BigNumber } from "ethers";
import { oneInch } from "./externalTxBuilders/oneInch";
import { uniswap } from "./externalTxBuilders/uniswap";
import { sushi } from "./localTxBuilders/sushiswap";
import { useEffect, useState } from "react";


async function generateCallData(tokens: any, slippage: number, provider: any, amountPerTrade: JSBI, setTxObject: any) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    try {
      console.log("Token " + token.name + " processing");

      if (slippage > 50) {
        throw "slippage too high";
      }

      await oneInch(provider, token, amountPerTrade, slippage, setTxObject);
    } catch (error) {

      token.protocol === "Uniswap V3" ? await uniswap(provider, token, amountPerTrade, slippage, setTxObject) : null;

      token.protocol === "Sushiswap" ? await sushi(provider, token, amountPerTrade, slippage, setTxObject) : null;
    }
  }
}

export default function useGenerateCalldata(provider: any, tokens: any, slippage: number, totalAmountIn: BigNumber, generating: string, setGenerating: any) {

  const [txObject, setTxObject] = useState({
    callData: [],
    tokenId: [],
    value: JSBI.BigInt(0),
  });

  useEffect(() => {
    if (generating === "true") {
      const amountPerTrade = amountInPerTrade(totalAmountIn, tokens);
      generateCallData(tokens, slippage, provider, amountPerTrade, setTxObject);
      setGenerating("false");
    }
  }, [generating]);

  return txObject;
}


function amountInPerTrade(totalAmountIn: any, tokens: any) {
  const totalAmountInBN = JSBI.BigInt(totalAmountIn.toString());
  const amountPerTrade = JSBI.divide(totalAmountInBN, JSBI.BigInt(tokens.length));
  return amountPerTrade;
}
