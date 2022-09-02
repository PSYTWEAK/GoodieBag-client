import { createClient } from "urql";
import { useEffect, useState } from "react";
import useUniswapSubgraph from "../../subgraphs/useUniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from ".././globals";
import { removeLowVolume, removeDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens } from ".././filters";
import useSushiswapSubgraph from "../../subgraphs/useSushiswapSubgraph";

const uniQuery = `
query {
  pools(first: 100 orderBy:createdAtTimestamp orderDirection:desc) {
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

const sushiQuery = `
query {
  pairs(first: 50 orderBy:createdAtTimestamp orderDirection:desc) {
      volumeUSD
       id
       createdAtTimestamp
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
`;

export default async function useMostRecent(config: any) {
  const result = await querySubgraphs(config);

  let pools: any = result;
  pools = removeDuplicates(pools);
  pools = removeBlueChips(pools);
  pools = removeStables(pools);
  pools = removeSignOfDerivInTokenName(pools);

  return pools;
}

async function querySubgraphs(config: any) {
  let tokens: any = [];

  if (config.uniswap) {
    try {
      let result = await useUniswapSubgraph(uniQuery);

      result ? tokens.push(...format(result.data)) : null;
    } catch (err) {
      console.log(err);
    }
  }
  if (config.sushiswap) {
    try {
      let result = await useSushiswapSubgraph(sushiQuery);

      result ? tokens.push(...format(result.data)) : null;
      console.log("Sushi");
      console.log(result);
    } catch (err) {
      console.log("Sushi");
      console.log(err);
    }
  }
  return tokens;
}

function format(pools: any): any {
  let tokens = [];
  for (let i = 0; i < pools.length; i++) {
    let token = {
      id: pools[i].token0.id != weth ? pools[i].token1.id : pools[i].token0.id,
      name: pools[i].token0.id != weth ? pools[i].token1.name : pools[i].token0.name,
      symbol: pools[i].token0.id != weth ? pools[i].token1.symbol : pools[i].token0.name,
      volumeUSD: pools[i].volumeUSD,
      protocol: "Uniswap V3",
      stratergySpecificDataDes: `Added to Uniswap at`,
      stratergySpecificData: `${date(pools[i].createdAtTimestamp)}`,
    };

    if (token.id && token.id != weth) {
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
