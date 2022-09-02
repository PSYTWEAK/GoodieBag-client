import JSBI from "jsbi";
import { BigNumber } from "ethers";
import { oneInch } from "./externalTxBuilders/oneInch";
import { uniswap } from "./externalTxBuilders/uniswap";

export default async function useGenerateCalldata(provider: any, tokens: any, slippage: number, totalAmountIn: BigNumber) {
  let callData: any = [];
  let tokenId: any = [];
  let value = JSBI.BigInt(0);

  const amountPerTrade = amountInPerTrade(totalAmountIn, tokens);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    try {
      console.log("Token " + token.name + " processing");

      if (slippage > 50) {
        throw "slippage too high";
      }

      await oneInch(provider, token, amountPerTrade, slippage, callData, tokenId, value);
    } catch (error) {
      console.log(error);

      if (token.protocol === "Uniswap V3") {
        await uniswap(provider, token, amountPerTrade, slippage, callData, tokenId, value);
      } else if (token.protocol === "Sushi") {
      }
    }
  }

  return [value, tokenId, callData];
}

function amountInPerTrade(totalAmountIn: any, tokens: any) {
  const totalAmountInBN = JSBI.BigInt(totalAmountIn.toString());
  const amountPerTrade = JSBI.divide(totalAmountInBN, JSBI.BigInt(tokens.length));
  return amountPerTrade;
}
