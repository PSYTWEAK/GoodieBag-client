import { BigNumber } from "ethers";
import { CurrencyAmount, Token, TradeType, Percent } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { arbiTokenEaterAddress } from "../globals";
import { weth } from "./stratergies/globals";

export default async function useUniswapTrade(provider: any, tokens: any, amountIn: BigNumber) {
  const router = new AlphaRouter({ chainId: provider._network.chainId, provider: provider });
  const percentSlippage = new Percent(100, 100);

  const amountInBN = JSBI.BigInt(amountIn.toString());

  const amountPerPool = JSBI.divide(amountInBN, JSBI.BigInt(tokens.length));

  const TokenA = new Token(provider._network.chainId, weth, 18, "WETH", "Wrapped ETH");

  const wethAmount = CurrencyAmount.fromRawAmount(TokenA, JSBI.BigInt(amountPerPool.toString()));

  let callData = [];
  let tokenId = [];
  let value = JSBI.BigInt(0);

  for (let i = 0; i < tokens.length; i++) {
    console.log("Token " + i + " processing");
    try {
      const Token = tokens[i];

      const TokenB = new Token(provider._network.chainId, Token.id, 18, Token.symbol, Token.name);

      const route: any = await router.route(wethAmount, TokenB, TradeType.EXACT_INPUT, {
        recipient: arbiTokenEaterAddress,
        slippageTolerance: percentSlippage,
        deadline: Math.floor(Date.now() / 1000 + 10800),
      });

      callData.push(route.methodParameters.calldata);
      tokenId.push(Token.id);
      value = JSBI.add(amountPerPool, value);
    } catch (error) {
      console.log("Token " + i + " failed");
      console.log(tokens[i]);
    }
  }

  return [value, tokenId, callData];
}
