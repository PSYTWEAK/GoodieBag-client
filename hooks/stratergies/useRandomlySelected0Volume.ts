import { createClient } from "urql";
import { useEffect, useState } from "react";
import useUniswapSubgraph from "../subgraphQuerys/useUniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from "./globals";
import { removeDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens, removeVolume } from "./filters";

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
export default async function useRandomlySelected0Volume(poolsLength: number) {
  const result = await useUniswapSubgraph(query);

  let pools: any = result.data.poolDayDatas;

  console.log(pools);

  pools = format(pools);
  pools = removeBlueChips(pools);
  pools = removeStables(pools);
  pools = removeVolume(pools);
  pools = removeSignOfDerivInTokenName(pools);
  pools = removeDuplicates(pools);
  pools = shuffleTokens(pools);
  pools = pools.slice(0, poolsLength);

  return pools;
}

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
    _pools[i].pool.stratergySpecificDataDes = ``;
    _pools[i].pool.stratergySpecificData = ``;

    /* to get the volume of ETH from the broken subgraph its 
    a = volume / tokenPrice
    b = a / 10^18 */
  }
  return _pools;
}
