import { BigNumber } from "ethers";
import { CurrencyAmount, Token, TradeType, Percent } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { weth, arbiTokenEaterAddress } from "../../../globals";

export async function uniswap(provider: any, token: any, amountPerTrade: JSBI, slippage: number, callData: any, tokenId: any, value: JSBI) {
  console.log("Trying Uniswap");
  const router = new AlphaRouter({ chainId: provider._network.chainId, provider: provider });

  const WETH = new Token(provider._network.chainId, weth, 18, "WETH", "Wrapped ETH");

  const wethAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(amountPerTrade.toString()));

  const percentSlippage = new Percent(slippage, 100);

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
  } else {
    console.log("Uniswap failed");
  }
}
