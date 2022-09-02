import { BigNumber } from "ethers";
import { CurrencyAmount, Token, TradeType, Percent } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { weth, arbiTokenEaterAddress } from "../../../globals";

export async function sushi(provider: any, token: any, amountPerTrade: JSBI, slippage: number, callData: any, tokenId: any, value: JSBI) {
  console.log("Trying Sushi");
  const sushi;

  const path = [weth, token.id];

  const contractQuote = await sushi.getAmountsOut(amountPerTrade, path);

  const minimumAmountOut = _minimumAmountOut(contractQuote, slippage);

  // swap here

  if (route) {
    callData.push(route.methodParameters.calldata);
    tokenId.push(token.id);
    value = JSBI.add(amountPerTrade, value);
  }

  return [value, tokenId, callData];
}

function _minimumAmountOut(contractQuote: any, slippage: number) {
  // contractQuote - (contractQuote / (slippage / 100))
  return JSBI.subtract(contractQuote, JSBI.divide(contractQuote, JSBI.divide(JSBI.BigInt(slippage), JSBI.BigInt(100))));
}
