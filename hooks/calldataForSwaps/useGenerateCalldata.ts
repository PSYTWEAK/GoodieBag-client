import JSBI from "jsbi";
import { BigNumber, ethers } from "ethers";
import { zeroX } from "./externalTxBuilders/zeroX";
import { uniswap } from "./externalTxBuilders/uniswap";
import { sushi } from "./localTxBuilders/sushiswap";
import { useEffect, useState } from "react";

// This hook is used to generate the calldata for the swaps for every token and split the total amount in between them
// It also checks if the slippage is too high and if so, it will use the localTxBuilders
// The localTxBuilders are used to generate the calldata for the swaps for tokens that are not supported by 1inch or have a slippage too high

async function generateTokenSwapCalldata(index: number, state: any, setState: any, config: any, amountPerTrade: JSBI, setTxObject: any) {

  let token: any = state.tokens[index];
  let success: boolean = false;

  setState((prevState: any) => {
    let newTokens = [...prevState.tokens];
    newTokens[index].hasCalldata = "loading";
    return { ...prevState, tokens: newTokens };
  });

  if (config.slippage < 50) {
    success = await zeroX(state.provider, token, setState, amountPerTrade, config.slippage, setTxObject, state.address);
  }

  if (!success && token.protocol === "Uniswap V3") {

    success = await uniswap(state.provider, token, amountPerTrade, config.slippage, setTxObject, state.address);
  }

  if (!success && token.protocol === "Sushiswap") {

    success = await sushi(state.provider, token, setState, amountPerTrade, config.slippage, setTxObject, state.address);
  }

  setState((prevState: any) => {
    let newTokens = [...prevState.tokens];
    newTokens[index].hasCalldata = success.toString();
    return { ...prevState, tokens: newTokens };
  });

}

export default function useGenerateCalldata(state: any, setState: any, config: any) {

  const [txObject, setTxObject] = useState({
    router: [],
    callData: [],
    tokenId: [],
    value: JSBI.BigInt(0),
    completed: false,
  });

  useEffect(() => {

    setTxObject({
      router: [],
      callData: [],
      tokenId: [],
      value: JSBI.BigInt(0),
      completed: false,
    });

  }, [state.amountETHIn, state.tokens.length, config]);


  async function generateCallData() {

    setTxObject({
      router: [],
      callData: [],
      tokenId: [],
      value: JSBI.BigInt(0),
      completed: false,
    });

    const amountPerTrade = amountInPerTrade(ethers.utils.parseEther(state.amountETHIn.toString()), state.tokens);

    for (let i = 0; i < state.tokens.length; i++) {
      await generateTokenSwapCalldata(i, state, setState, config, amountPerTrade, setTxObject);

    }


    setTxObject((prevState: any) => ({
      ...prevState,
      completed: true,
    }));

  }


  return { txObject, setTxObject, generateCallData };
}


function amountInPerTrade(totalAmountIn: any, tokens: any) {
  const totalAmountInBN = JSBI.BigInt(totalAmountIn.toString());
  const amountPerTrade = JSBI.divide(totalAmountInBN, JSBI.BigInt(tokens.length));
  return amountPerTrade;
}
