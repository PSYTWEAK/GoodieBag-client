import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { CurrencyAmount, Token, TradeType, Percent, BigintIsh } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Route } from "@uniswap/v3-sdk";
import { Trade } from "@uniswap/v3-sdk";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";

interface Immutables {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: ethers.BigNumber;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}

const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

export default async function useUniswapTradeExample(provider: any, pools: any, amountIn: number) {
  const pool = pools[4];

  const poolContract = new ethers.Contract(pool.pool.id, IUniswapV3PoolABI, provider);

  const quoterContract = new ethers.Contract(quoterAddress, QuoterABI, provider);

  async function getPoolState(poolContract: any) {
    // note that data here can be desynced if the call executes over the span of two or more blocks.
    const [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()]);

    const PoolState: State = {
      liquidity,
      sqrtPriceX96: slot[0],
      tick: slot[1],
      observationIndex: slot[2],
      observationCardinality: slot[3],
      observationCardinalityNext: slot[4],
      feeProtocol: slot[5],
      unlocked: slot[6],
    };

    return PoolState;
  }

  async function getPoolImmutables() {
    const [factory, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([poolContract.factory(), poolContract.fee(), poolContract.tickSpacing(), poolContract.maxLiquidityPerTick()]);
    const token0 = pool.pool.token0.id;
    const token1 = pool.pool.token1.id;

    const immutables: Immutables = {
      factory, // chain
      token0, // graph
      token1, // graph
      fee, // graph
      tickSpacing, // chain
      maxLiquidityPerTick, // chain
    };
    return immutables;
  }
  // query the state and immutable variables of the pool
  const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState(poolContract)]);

  // create instances of the Token object to represent the two tokens in the given pool
  const TokenA = new Token(provider._network.chainId, immutables.token0, 18, pool.pool.token0.symbol, pool.pool.token0.name);

  const TokenB = new Token(provider._network.chainId, immutables.token1, 18, pool.pool.token1.symbol, pool.pool.token1.name);

  // create an instance of the pool object for the given pool
  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
    state.liquidity.toString(),
    state.tick
  );
  console.log(poolExample);

  // call the quoter contract to determine the amount out of a swap, given an amount in
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(immutables.token0, immutables.token1, immutables.fee, amountIn.toString(), 0);

  // create an instance of the route object in order to construct a trade object
  const swapRoute = new Route([poolExample], TokenA, TokenB);

  // create an unchecked trade instance
  const uncheckedTradeExample = await Trade.createUncheckedTrade({
    route: swapRoute,
    inputAmount: CurrencyAmount.fromRawAmount(TokenA, amountIn),
    outputAmount: CurrencyAmount.fromRawAmount(TokenB, quotedAmountOut.toString()),
    tradeType: TradeType.EXACT_INPUT,
  });

  // print the quote and the unchecked trade instance in the console
  console.log("The quoted amount out is", quotedAmountOut.toString());
  console.log("The unchecked trade object is", uncheckedTradeExample);
}
