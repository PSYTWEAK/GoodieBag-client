import { createClient } from "urql";
import { useEffect, useState } from "react";
import useUniswapSubgraph from "../subgraphQuerys/useUniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from "./globals";
import { removeLowVolume, removeDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens } from "./filters";

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

export default async function useMostRecent(poolsLength: number) {
  const result = await useUniswapSubgraph(query);
  console.log(result);

  let pools: any = result.data.pools;

  pools = format(pools);
  pools = removeBlueChips(pools);
  pools = removeStables(pools);
  pools = removeSignOfDerivInTokenName(pools);
  pools = removeDuplicates(pools);
  pools = pools.slice(0, poolsLength);

  return pools;
}

function format(pools: any): any {
  let tokens = [];
  for (let i = 0; i < pools.length; i++) {
    let token = {
      id: pools[i].token0.id != weth ? pools[i].token1.id : pools[i].token0.id,
      name: pools[i].token0.id != weth ? pools[i].token1.name : pools[i].token0.name,
      symbol: pools[i].token0.id != weth ? pools[i].token1.symbol : pools[i].token0.name,
      volumeUSD: pools[i].volumeUSD,
      stratergySpecificDataDes: `Added to Uniswap at`,
      stratergySpecificData: `${date(pools[i].createdAtTimestamp)}`,
    };

    if (token.id && token.id != weth) {
      console.log(token.id);
      tokens.push(token);
    }
  }

  return tokens;
}

function date(timestamp: number) {
  var date = new Date(timestamp * 1000);
  var formattedDate =
    ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  return formattedDate;
}
