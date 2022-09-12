import JSBI from "jsbi";
import { BigNumber, ethers } from "ethers";
import { oneInch } from "./externalTxBuilders/oneInch";
import { uniswap } from "./externalTxBuilders/uniswap";
import { sushi } from "./localTxBuilders/sushiswap";
import { useEffect, useState } from "react";

// This hook is used to generate the calldata for the swaps for every token and split the total amount in between them
// It also checks if the slippage is too high and if so, it will use the localTxBuilders
// The localTxBuilders are used to generate the calldata for the swaps for tokens that are not supported by 1inch or have a slippage too high

async function generateCallData(tokens: any, setTokens: any, slippage: number, provider: any, amountPerTrade: JSBI, setTxObject: any) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    setTokens((prevState: any) => {
      prevState[i].hasCalldata = "loading";
      return [...prevState];
    });
    try {
      console.log("Token " + token.name + " processing");

      if (slippage > 50) {
        throw "slippage too high";
      }

      await oneInch(provider, token, amountPerTrade, slippage, setTxObject);
    } catch (error) {

      try {
        token.protocol === "Uniswap V3" ? await uniswap(provider, token, amountPerTrade, slippage, setTxObject) : null;

        token.protocol === "Sushiswap" ? await sushi(provider, token, amountPerTrade, slippage, setTxObject) : null;
        setTokens((prevState: any) => {
          prevState[i].hasCalldata = "true";
          return [...prevState];
        });
      } catch (error) {
        console.log(error)
        setTokens((prevState: any) => {
          prevState[i].hasCalldata = "false";
          return [...prevState];
        });
      }

    }
  }
}

export default function useGenerateCalldata(provider: any, tokens: any, setTokens: any, slippage: number, totalAmountIn: BigNumber, generating: string, setGenerating: any) {

  const [txObject, setTxObject] = useState({
    router: [],
    callData: [],
    tokenId: [],
    value: JSBI.BigInt(0),
  });

  useEffect(() => {
    if (generating === "true") {
      setTxObject({
        router: [],
        callData: [],
        tokenId: [],
        value: JSBI.BigInt(0),
      });
      _gen()
    }
    async function _gen() {
      const amountPerTrade = amountInPerTrade(ethers.utils.parseEther(totalAmountIn.toString()), tokens);
      await generateCallData(tokens, setTokens, slippage, provider, amountPerTrade, setTxObject);
      setGenerating("done");
    }
  }, [generating]);


  return txObject;
}


function amountInPerTrade(totalAmountIn: any, tokens: any) {
  const totalAmountInBN = JSBI.BigInt(totalAmountIn.toString());
  const amountPerTrade = JSBI.divide(totalAmountInBN, JSBI.BigInt(tokens.length));
  return amountPerTrade;
}
