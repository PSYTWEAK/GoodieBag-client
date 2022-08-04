import { createClient } from "urql";
import { useEffect, useState } from "react";
import useMostRecentPools from "../subgraphQuerys/useMostRecentPools";
import { blueChips, lowVolume, weth, stables } from "./globals";
import { removeLowVolume, removeBlueChips, removeStables, removeStableInTokenName, removeNoneEthPools, shuffleTokens } from "./filters";

export default async function useMostRecent() {
  const result = await useMostRecentPools();

  let pools: any = result.data.pools;
  pools = format(pools);
  pools = removeBlueChips(pools);
  pools = removeStables(pools);
  // pools = removeLowVolume(pools);
  pools = removeStableInTokenName(pools);
  pools = removeNoneEthPools(pools);
  pools = shuffleTokens(pools);
  pools = pools.slice(0, 10);

  return pools;
}

function format(pools: any): any {
  let _pools = [];

  for (let i = 0; i < pools.length; i++) {
    if (pools[i].token0.id != weth) {
      let data = {
        pool: {
          feeTier: pools[i].feeTier,
          id: pools[i].id,
          volumeUSD: pools[i].volumeUSD,
          liquidity: pools[i].liquidity,
          token0: { id: weth, name: "", symbol: "", __typename: "Token" },
          token1: { id: pools[i].token0.id, name: pools[i].token0.name, symbol: pools[i].token0.symbol, __typename: "Token" },
        },
      };
      _pools.push(data);
    } else {
      let data = {
        pool: {
          feeTier: pools[i].feeTier,
          id: pools[i].id,
          volumeUSD: pools[i].volumeUSD,
          liquidity: pools[i].liquidity,
          token0: { id: weth, name: "", symbol: "", __typename: "Token" },
          token1: { id: pools[i].token1.id, name: pools[i].token1.name, symbol: pools[i].token1.symbol, __typename: "Token" },
        },
      };
      _pools.push(data);
    }
  }

  return _pools;
}
