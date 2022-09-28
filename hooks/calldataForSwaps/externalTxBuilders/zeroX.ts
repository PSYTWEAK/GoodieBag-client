import axios from "axios";
import JSBI from "jsbi";
import { weth, arbiSwapperAddress, oneInchAddress } from "../../../globals";

export let apiBaseUrl: string = "";

const chainUrl = new Map()

chainUrl.set(42161, "https://arbitrum.api.0x.org/swap/v1/")

export async function zeroX(provider: any, token: any, amountPerTrade: JSBI, slippage: number, setTxObject: any, address: string) {

  try {

    const chainId = provider._network.chainId;

    apiBaseUrl = chainUrl.get(chainId);


    const quoteParams = {
      sellToken: token.id,
      buyToken: weth,
      sellAmount: amountPerTrade,
    };

    const calldata = await getTxCalldataForSwap(quoteParams);

    if (calldata) {
      setTxObject((prevState: any) => ({
        router: [...prevState.router, oneInchAddress],
        callData: [...prevState.callData, calldata],
        tokenId: [...prevState.tokenId, token.id],
        value: JSBI.add(amountPerTrade, prevState.value),
      }));
    }

    return !!calldata;
  } catch (e) {
    console.log(e);
    return false;
  }

}

async function getTxCalldataForSwap(quoteParams: any) {
  const url = apiRequestUrl("/quote", quoteParams);
  return axios
    .get(url)
    .then((res: any) => {
      console.log(res)
      return res.data.data;
    })
    .catch((err) => {
      console.log('err', err);
    });
}

function apiRequestUrl(methodName: any, queryParams: any) {
  return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
}

