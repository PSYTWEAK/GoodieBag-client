import { createClient } from "urql";
import { useEffect, useState } from "react";
import useUniswapSubgraph from "../subgraphQuerys/useUniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from "./globals";
import { removeLowVolume, removeDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens } from "./filters";

var start: any = new Date();
start.setUTCHours(0, 0, 0, 0);

const query = `
query {
  poolDayDatas(first: 1000 where: {date: ${start / 1000} } orderBy:volumeUSD orderDirection:desc) {
      date
      volumeUSD
      pool {
       id
      liquidity
      feeTier

        token0 {
          id
          name
          symbol
        }
     token1{
        id
        name
        symbol
        }
      }

}
}`;
export default async function useRandomlySelected(poolsLength: number) {
  const result = await useUniswapSubgraph(query);

  let pools: any = result.data.poolDayDatas;

  pools = format(pools);
  pools = removeBlueChips(pools);
  pools = removeStables(pools);
  pools = removeNoneEthPools(pools);
  pools = removeSignOfDerivInTokenName(pools);
  pools = removeDuplicates(pools);
  pools = shuffleTokens(pools);
  pools = pools.slice(0, poolsLength);

  return pools;
}

function format(pools: any): any {
  let _pools = Object.assign([], pools);
  for (let i = 0; i < pools.length; i++) {
    if (pools[i].pool.token0.id != weth) {
      _pools[i].pool.token1.id = pools[i].pool.token0.id;
      _pools[i].pool.token1.name = pools[i].pool.token0.name;
      _pools[i].pool.token1.symbol = pools[i].pool.token0.symbol;
      _pools[i].pool.token0.id = weth;
      _pools[i].pool.token0.name = "";
      _pools[i].pool.token0.symbol = "";
    }
  }
  return _pools;
}
