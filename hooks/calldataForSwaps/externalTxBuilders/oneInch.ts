import axios from "axios";
import JSBI from "jsbi";
import { weth, arbiTokenEaterAddress } from "../../../globals";

export let apiBaseUrl: string = "";

export async function oneInch(provider: any, token: any, amountPerTrade: JSBI, slippage: number, setCallData: any, setTokenId: any, setValue: any) {
  console.log("Trying 1inch");

  const chainId = provider._network.chainId;

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

  const calldata = await buildTxForSwap(swapParams);

  if (calldata) {
    setCallData((callData: any) => [...callData, calldata]);
    setTokenId((tokenId: any) => [...tokenId, token.id]);
    setValue(JSBI.add(amountPerTrade, setValue));
  } else {
    console.log("1inch failed");
  }
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

function apiRequestUrl(methodName: any, queryParams: any) {
  return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
}