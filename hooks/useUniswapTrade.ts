import { ethers, BigNumber } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { CurrencyAmount, Token, TradeType, Percent, BigintIsh } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Route } from "@uniswap/v3-sdk";
import { Trade } from "@uniswap/v3-sdk";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { useProvider } from "wagmi";
import { AlphaRouter } from "@uniswap/smart-order-router";
import JSBI from "jsbi";
import { arbiUniswapQuoterAddress, arbiUniswapRouterAddress, arbiTokenEaterAddress } from "../globals";

export default async function useUniswapTrade(provider: any, pools: any, amountIn: BigNumber) {
  const router = new AlphaRouter({ chainId: provider._network.chainId, provider: provider });
  const percentSlippage = new Percent(100, 100);
  let callData = [];
  let tokenId = [];
  let value = JSBI.BigInt(0);

  const amountInBN = JSBI.BigInt(amountIn.toString());
  const amountPerPool = JSBI.divide(amountInBN, JSBI.BigInt(pools.length));
  const TokenA = new Token(provider._network.chainId, pools[0].pool.token0.id, 18, pools[0].pool.token0.symbol, pools[0].pool.token0.name);
  const wethAmount = CurrencyAmount.fromRawAmount(TokenA, JSBI.BigInt(amountPerPool.toString()));
  for (let i = 0; i < pools.length; i++) {
    console.log("Pool " + i + " processing");
    try {
      const pool = pools[i];

      const TokenB = new Token(provider._network.chainId, pool.pool.token1.id, 18, pool.pool.token1.symbol, pool.pool.token1.name);

      const route: any = await router.route(wethAmount, TokenB, TradeType.EXACT_INPUT, {
        recipient: arbiTokenEaterAddress,
        slippageTolerance: percentSlippage,
        deadline: Math.floor(Date.now() / 1000 + 10800),
      });
      callData.push(route.methodParameters.calldata);
      tokenId.push(pool.pool.token1.id);
      value = JSBI.add(amountPerPool, value);
    } catch (error) {
      console.log("pool " + i + "failed");
      console.log(pools[i]);
    }
  }

  return [value, tokenId, callData];
}
/* 
ethers.utils.parseEther(amountETHIn.toString()),

*/
