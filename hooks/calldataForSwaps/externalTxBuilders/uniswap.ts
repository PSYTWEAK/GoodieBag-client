import { CurrencyAmount, Token, TradeType, Percent } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { weth, arbiGoodieBagAddress, arbiUniswapRouterAddress } from "../../../globals";

export async function uniswap(provider: any, token: any, amountPerTrade: JSBI, slippage: number, setTxObject: any) {

  const router = new AlphaRouter({ chainId: provider._network.chainId, provider: provider });

  //  const WETH = new Token(provider._network.chainId, weth, 18, "WETH", "Wrapped ETH");

  //  const wethAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(amountPerTrade.toString()));

  const percentSlippage = new Percent(slippage, 100);

  const TokenB = new Token(provider._network.chainId, token.id, 18, token.symbol, token.name);


  const route: any = false;

  return !!route;

}
