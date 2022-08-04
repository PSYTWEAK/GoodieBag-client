import { createClient } from "urql";
import { useEffect, useState } from "react";
import useOrderedByVolume from "../subgraphQuerys/useOrderedByVolume";
import { blueChips, lowVolume, weth, stables } from "./globals";
import { removeLowVolume, removeBlueChips, removeStables, removeStableInTokenName, removeNoneEthPools, shuffleTokens } from "./filters";

export default async function useRandomlySelected() {
  const result = await useOrderedByVolume();

  let pools: any = result.data.poolDayDatas;
  console.log(pools);

  pools = removeBlueChips(pools);
  pools = removeStables(pools);
  // pools = removeLowVolume(pools);
  pools = removeNoneEthPools(pools);
  pools = removeStableInTokenName(pools);
  pools = format(pools);
  pools = shuffleTokens(pools);
  pools = pools.slice(0, 10);

  console.log(pools);

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
