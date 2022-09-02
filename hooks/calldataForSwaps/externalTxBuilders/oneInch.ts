import axios from "axios";
import JSBI from "jsbi";
import { weth } from "./stratergies/globals";
import { arbiTokenEaterAddress } from "../globals";

export let apiBaseUrl: string = "";

export async function tryOneInch(chainId: any, token: any, amountPerTrade: JSBI, slippage: number, callData: any, tokenId: any, value: JSBI) {
  console.log("Trying 1inch");

  apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;

  const swapParams = {
    fromTokenAddress: weth,
    toTokenAddress: token.id,
    amount: amountPerTrade,
    fromAddress: arbiTokenEaterAddress,
    slippage: slippage,
    disableEstimate: true,
    allowPartialFill: false,
    burnChi: false,
  };
  const swapCalldata = await buildTxForSwap(swapParams);
  if (swapCalldata) {
    callData.push(swapCalldata);
    tokenId.push(token.id);
    value = JSBI.add(amountPerTrade, value);
  }
}
function apiRequestUrl(methodName: any, queryParams: any) {
  return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
}
async function buildTxForSwap(swapParams: any) {
  const url = apiRequestUrl("/swap", swapParams);
  return axios
    .get(url)
    .then((res: any) => {
      console.log(res);
      return res.data.tx.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
