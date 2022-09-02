import { BigNumber } from "ethers";
import { CurrencyAmount, Token, TradeType, Percent } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { weth, arbiTokenEaterAddress } from "../../../globals";

export async function sushi(provider: any, token: any, amountPerTrade: JSBI, slippage: number, callData: any, tokenId: any, value: JSBI) {
  const sushi;

  const path = [weth, token.id];

  const contractQuote = await sushi.getAmountsOut(amountPerTrade, path);

  const minimumAmountOut = _minimumAmountOut(contractQuote, slippage);

  try {
    console.log("Trying Sushi");

    const TokenB = new Token(provider._network.chainId, token.id, 18, token.symbol, token.name);

    const route: any = await router.route(wethAmount, TokenB, TradeType.EXACT_INPUT, {
      recipient: arbiTokenEaterAddress,
      slippageTolerance: percentSlippage,
      deadline: Math.floor(Date.now() / 1000 + 10800),
    });

    if (route) {
      callData.push(route.methodParameters.calldata);
      tokenId.push(token.id);
      value = JSBI.add(amountPerTrade, value);
    }
  } catch (error) {
    console.log("Token " + token.name + " failed");
    console.log(error);
  }

  return [value, tokenId, callData];
}

function _minimumAmountOut(contractQuote: any, slippage: number) {
  return JSBI.subtract(contractQuote, JSBI.divide(contractQuote, JSBI.divide(JSBI.BigInt(slippage), JSBI.BigInt(100))));
}
