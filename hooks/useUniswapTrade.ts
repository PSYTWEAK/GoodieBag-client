import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { CurrencyAmount, Token, TradeType, Percent, BigintIsh } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Route } from "@uniswap/v3-sdk";
import { Trade } from "@uniswap/v3-sdk";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { useProvider } from "wagmi";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";

const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

export default async function useUniswapTrade(provider: any, pools: any, amountIn: number) {
  const pool = pools[4];

  // create instances of the Token object to represent the two tokens in the given pool
  const TokenA = new Token(provider._network.chainId, pool.pool.token0.id, 18, pool.pool.token0.symbol, pool.pool.token0.name);

  const TokenB = new Token(provider._network.chainId, pool.pool.token1.id, 18, pool.pool.token1.symbol, pool.pool.token1.name);

  // call the quoter contract to determine the amount out of a swap, given an amount in
  const percentSlippage = new Percent(99, 100);
  const router = new AlphaRouter({ chainId: 42161, provider: provider });

  const bn = JSBI.BigInt(amountIn);

  const wethAmount = CurrencyAmount.fromRawAmount(TokenA, bn);

  const route: any = await router.route(wethAmount, TokenB, TradeType.EXACT_INPUT, {
    recipient: "0x36dE9b454066AE3CafBFff1de5f29F31a8EFC890",
    slippageTolerance: percentSlippage,
    deadline: Math.floor(Date.now() / 1000 + 1800),
  });

  /*   const transaction = {
    data: route.methodParameters.calldata,
    to: routerAddress,
    value: bn,
    from: MY_ADDRESS,
    gasPrice: BigNumber.from(route.gasPriceWei),
  };
  await provider.sendTransaction(transaction); */
  //console.log(route.methodParameters.calldata);
}
