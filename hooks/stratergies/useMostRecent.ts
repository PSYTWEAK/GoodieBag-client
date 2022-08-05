import { createClient } from "urql";
import { useEffect, useState } from "react";
import useUniswapSubgraph from "../subgraphQuerys/useUniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from "./globals";
import { removeLowVolume, removeDuplicates, removeBlueChips, removeStables, removeStableInTokenName, removeNoneEthPools, shuffleTokens } from "./filters";

const query = `
{
  pools(first: 300 orderBy:createdAtTimestamp orderDirection:desc) {
createdAtTimestamp
      volumeUSD
  
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
}`;

export default async function useMostRecent() {
  const result = await useUniswapSubgraph(query);

  let pools: any = result.data.pools;

  pools = format(pools);
  pools = removeBlueChips(pools);
  pools = removeStables(pools);
  pools = removeStableInTokenName(pools);
  pools = removeNoneEthPools(pools);
  pools = removeDuplicates(pools);
  pools = pools.slice(0, 10);

  return pools;
}

function format(pools: any): any {
  let _pools = [];

  for (let i = 0; i < pools.length; i++) {
    let data = {
      pool: {
        feeTier: pools[i].feeTier,
        id: pools[i].id,
        volumeUSD: pools[i].volumeUSD,
        liquidity: pools[i].liquidity,
        token0: { id: weth, name: "", symbol: "", __typename: "Token" },
        token1:
          pools[i].token0.id != weth
            ? { id: pools[i].token0.id, name: pools[i].token0.name, symbol: pools[i].token0.symbol, __typename: "Token" }
            : { id: pools[i].token1.id, name: pools[i].token1.name, symbol: pools[i].token1.symbol, __typename: "Token" },
      },
    };
    _pools.push(data);
  }

  return _pools;
}
