
import { CurrencyAmount, Token, TradeType, Percent } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { weth, arbiUniswapRouterAddress } from "../../../globals";
import { getAddressIndex } from "../arbAddressTable";

export async function uniswap(provider: any, token: any, amountPerTrade: JSBI, slippage: number, setTxObject: any, address: string) {

  try {

    const router = new AlphaRouter({ chainId: provider._network.chainId, provider: provider });

    const WETH = new Token(provider._network.chainId, weth, 18, "WETH", "Wrapped ETH");

    const wethAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(amountPerTrade.toString()));

    const percentSlippage = new Percent(slippage, 100);

    const TokenB = new Token(provider._network.chainId, token.id, 18, token.symbol, token.name);


    const route: any = await router.route(wethAmount, TokenB, TradeType.EXACT_INPUT, {
      recipient: address,
      slippageTolerance: percentSlippage,
      deadline: Math.floor(Date.now() / 1000 + 10800),
    });

    if (route) {
      setTxObject((prevState: any) => ({
        router: [...prevState.router, arbiUniswapRouterAddress],
        callData: [...prevState.callData, route.methodParameters.calldata],
        tokenId: [...prevState.tokenId, token.id],
        value: JSBI.add(amountPerTrade, prevState.value),
      }));
    }
    return !!route;

  } catch (e) {
    console.log(e);
    return false;
  }
}