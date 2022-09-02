import JSBI from "jsbi";
import { BigNumber } from "ethers";
import { oneInch } from "./txBuilders/oneInch";

export default async function useCalldataForSwaps(provider: any, tokens: any, slippage: number, totalAmountIn: BigNumber) {
  let callData: any = [];
  let tokenId: any = [];
  let value = JSBI.BigInt(0);

  const chainId = provider._network.chainId;

  const amountPerTrade = amountInPerTrade(totalAmountIn, tokens);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    try {
      console.log("Token " + token.name + " processing");
      await oneInch(chainId, token, amountPerTrade, slippage, callData, tokenId, value);
    } catch (error) {
      console.log("failed");
      try {
        name = lead["Details"]["Name"]["First"] + " " + lead["Details"]["Name"]["Last"];
      } catch (ex1) {
        name = "No Name";
      }
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
