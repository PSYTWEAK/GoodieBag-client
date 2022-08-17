import axios from "axios";
import JSBI from "jsbi";
import { weth } from "./stratergies/globals";
import { arbiTokenEaterAddress } from "../globals";
import { BigNumber } from "ethers";

export default async function useSushiswapTrade(provider: any, tokens: any, slippage: number, totalAmountIn: BigNumber) {
  let callData: any = [];
  let tokenId: any = [];
  let value = JSBI.BigInt(0);

  const chainId = provider._network.chainId;

  const amountPerTrade = amountInPerTrade(totalAmountIn, tokens);

  const apiBaseUrl = "https://api.1inch.io/v4.0/" + chainId;

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
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    try {
      console.log("Token " + token.name + " processing");
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
    } catch (error) {
      console.log("Token " + token.name + " failed");
      console.log(error);
    }
  }

  return [value, tokenId, callData];
}

function amountInPerTrade(totalAmountIn: any, tokens: any) {
  const totalAmountInBN = JSBI.BigInt(totalAmountIn.toString());
  const amountPerTrade = JSBI.divide(totalAmountInBN, JSBI.BigInt(tokens.length));
  return amountPerTrade;
}
