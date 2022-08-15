import fetch from "node-fetch";
import JSBI from "jsbi";
import { weth } from "./stratergies/globals";
import { arbiTokenEaterAddress } from "../globals";

let callData: any = [];
let tokenId: any = [];
let value = JSBI.BigInt(0);

export default async function useSushiswapTrade(provider: any, tokens: any, slippage: number, amountIn: BigNumber) {
  const chainId = provider._network.chainId;

  const apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;

  const amountInBN = JSBI.BigInt(amountIn.toString());

  const amountPerPool = JSBI.divide(amountInBN, JSBI.BigInt(tokens.length));

  function apiRequestUrl(methodName: any, queryParams: any) {
    return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
  }

  async function buildTxForSwap(swapParams: any) {
    const url = apiRequestUrl("/swap", swapParams);

    return fetch(url)
      .then((res: any) => res.json())
      .then((res: any) => res.tx);
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const swapParams = {
      fromTokenAddress: weth,
      toTokenAddress: token.id,
      amount: "100000000000000000",
      fromAddress: arbiTokenEaterAddress,
      slippage: 1,
      disableEstimate: false,
      allowPartialFill: false,
    };

    const swapTransaction = await buildTxForSwap(swapParams);

    callData.push(swapTransaction);
    tokenId.push(token.id);
    value = JSBI.add(amountPerPool, value);
  }

  return [value, tokenId, callData];
}
