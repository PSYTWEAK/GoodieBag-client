import { BigNumber } from "ethers";
import { CurrencyAmount, Token, TradeType, Percent } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { arbiTokenEaterAddress } from "../globals";
import { weth } from "./stratergies/globals";

let callData: any = [];
let tokenId: any = [];
let value = JSBI.BigInt(0);

export default async function useUniswapTrade(provider: any, tokens: any, amountIn: BigNumber) {
  const router = new AlphaRouter({ chainId: provider._network.chainId, provider: provider });
  const percentSlippage = new Percent(100, 100);

  const amountInBN = JSBI.BigInt(amountIn.toString());

  const amountPerPool = JSBI.divide(amountInBN, JSBI.BigInt(tokens.length));

  const TokenA = new Token(provider._network.chainId, weth, 18, "WETH", "Wrapped ETH");

  const wethAmount = CurrencyAmount.fromRawAmount(TokenA, JSBI.BigInt(amountPerPool.toString()));

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    try {
      console.log("Token " + token.name + " processing");
      const TokenB = new Token(provider._network.chainId, token.id, 18, token.symbol, token.name);

      const route: any = await router.route(wethAmount, TokenB, TradeType.EXACT_INPUT, {
        recipient: arbiTokenEaterAddress,
        slippageTolerance: percentSlippage,
        deadline: Math.floor(Date.now() / 1000 + 10800),
      });

      callData.push(route.methodParameters.calldata);
      tokenId.push(token.id);
      value = JSBI.add(amountPerPool, value);
    } catch (error) {
      console.log("Token " + token.name + " failed");
      console.log(error);
    }
  }

  return [value, tokenId, callData];
}
