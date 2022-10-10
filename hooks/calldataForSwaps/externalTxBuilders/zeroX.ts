import axios from "axios";
import JSBI from "jsbi";
import { weth, zeroXAddress } from "../../../globals";
import { getAddressIndex } from "../arbAddressTable";

export let apiBaseUrl: string = "";

const chainUrl = new Map()

chainUrl.set(42161, "https://arbitrum.api.0x.org/swap/v1/")

export async function zeroX(provider: any, token: any, setState: any, amountPerTrade: JSBI, slippage: number, setTxObject: any, address: string) {

  try {

    const chainId = provider._network.chainId;

    apiBaseUrl = chainUrl.get(chainId);


    const quoteParams = {
      sellToken: weth,
      buyToken: token.id,
      sellAmount: amountPerTrade,
      slippagePercentage: slippage / 100,
    };

    const [calldata, buyAmount] = await getTxCalldataForSwap(quoteParams);

    if (calldata) {
      let { addressIndex, tokenIndex } = await getIndexes(provider, token);
      setTxObject((prevState: any) => ({
        router: [...prevState.router, addressIndex],
        callData: [...prevState.callData, calldata],
        tokenId: [...prevState.tokenId, tokenIndex],
        value: JSBI.add(amountPerTrade, prevState.value),
      }));
    }

    if (buyAmount) {
      setState((prevState: any) => {
        const tokenIndex = prevState.tokens.findIndex((t: any) => t.id === token.id);
        prevState.tokens[tokenIndex].buyAmount = buyAmount;
        return prevState;
      }
      )
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


async function getIndexes(provider: any, token: any) {
  let addressIndex = await getAddressIndex(zeroXAddress, provider);
  let tokenIndex = await getAddressIndex(token.id, provider);
  return { addressIndex, tokenIndex };
}
