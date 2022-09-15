import axios from "axios";
import JSBI from "jsbi";
import { weth, arbiGoodieBagAddress, oneInchAddress } from "../../../globals";

export let apiBaseUrl: string = "";

export async function oneInch(provider: any, token: any, amountPerTrade: JSBI, slippage: number, setTxObject: any) {

  const chainId = provider._network.chainId;

  apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;

  const swapParams = {
    fromTokenAddress: weth,
    toTokenAddress: token.id,
    amount: amountPerTrade,
    fromAddress: arbiGoodieBagAddress,
    slippage: slippage,
    disableEstimate: true,
    allowPartialFill: false,
    burnChi: false,
  };

  const calldata = await buildTxForSwap(swapParams);

  if (calldata) {
    setTxObject((prevState: any) => ({
      router: [...prevState.router, oneInchAddress],
      callData: [...prevState.callData, calldata],
      tokenId: [...prevState.tokenId, token.id],
      value: JSBI.add(amountPerTrade, prevState.value),
    }));

  }
  return !!calldata;
}

async function buildTxForSwap(swapParams: any) {
  const url = apiRequestUrl("/swap", swapParams);
  return axios
    .get(url)
    .then((res: any) => {
      return res.data.tx.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

function apiRequestUrl(methodName: any, queryParams: any) {
  return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
}