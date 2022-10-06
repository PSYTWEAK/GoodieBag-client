import axios from "axios";
import JSBI from "jsbi";
import { weth, arbiSwapperAddress, oneInchAddress } from "../../../globals";
import { getAddressIndex } from "../arbAddressTable";

export let apiBaseUrl: string = "";

export async function oneInch(provider: any, token: any, amountPerTrade: JSBI, slippage: number, setTxObject: any, address: string) {

  try {

    const chainId = provider._network.chainId;

    apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;

    const swapParams = {
      fromTokenAddress: weth,
      toTokenAddress: token.id,
      amount: amountPerTrade,
      fromAddress: address,
      slippage: slippage,
      disableEstimate: true,
      allowPartialFill: false,
      burnChi: false,
    };

    const calldata = await getTxCalldataForSwap(swapParams);

    if (calldata) {
      let { addressIndex, tokenIndex } = await getIndexes(provider, token);
      setTxObject((prevState: any) => ({
        router: [...prevState.router, addressIndex],
        callData: [...prevState.callData, calldata],
        tokenId: [...prevState.tokenId, tokenIndex],
        value: JSBI.add(amountPerTrade, prevState.value),
      }));
    }

    return !!calldata;
  } catch (e) {
    console.log(e);
    return false;
  }

}

async function getTxCalldataForSwap(swapParams: any) {
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


async function getIndexes(provider: any, token: any) {
  let addressIndex = await getAddressIndex(oneInchAddress, provider);
  let tokenIndex = await getAddressIndex(token.id, provider);
  return { addressIndex, tokenIndex };
}
