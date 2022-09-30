import axios from "axios";
import JSBI from "jsbi";
import { weth, arbiSwapperAddress, zeroXAddress } from "../../../globals";
import { getAddressIndex } from "../arbAddressTable";

export let apiBaseUrl: string = "";

const chainUrl = new Map()

chainUrl.set(42161, "https://arbitrum.api.0x.org/swap/v1/")

export async function zeroX(provider: any, token: any, setTokens: any, amountPerTrade: JSBI, slippage: number, setTxObject: any, address: string) {

  try {

    const chainId = provider._network.chainId;

    apiBaseUrl = chainUrl.get(chainId);


    const quoteParams = {
      sellToken: token.id,
      buyToken: weth,
      sellAmount: amountPerTrade,
    };

    const [calldata, buyAmount] = await getTxCalldataForSwap(quoteParams);

    if (calldata) {
      setTxObject((prevState: any) => ({
        router: [...prevState.router, getAddressIndex(zeroXAddress, provider)],
        callData: [...prevState.callData, calldata],
        tokenId: [...prevState.tokenId, getAddressIndex(token.id, provider)],
        value: JSBI.add(amountPerTrade, prevState.value),
      }));
    }

    if (buyAmount) {
      setTokens((prevState: any) => {
        const newState = [...prevState];
        newState.forEach((token: any) => {
          if (token.id === quoteParams.sellToken) {
            token.buyAmount = buyAmount;
          }
        });
        return newState;
      });
    }

    return !!calldata;
  } catch (e) {
    console.log(e);
    return false;
  }

}

async function getTxCalldataForSwap(quoteParams: any): Promise<any> {
  const url = apiRequestUrl("/quote", quoteParams);
  return axios
    .get(url)
    .then((res: any) => {
      console.log(res)
      return [res.data.data, res.data.buyAmount];
    })
    .catch((err) => {
      console.log('err', err);
      return ["", ""];
    });
}

function apiRequestUrl(methodName: any, queryParams: any) {
  return apiBaseUrl + methodName + "?" + new URLSearchParams(queryParams).toString();
}

