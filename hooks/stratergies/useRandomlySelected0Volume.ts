import { createClient } from "urql";
import { useEffect, useState } from "react";
import useUniswapSubgraph from "../subgraphQuerys/useUniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from "./globals";
import { removeDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens, removeVolume } from "./filters";

var start: any = new Date();
start.setUTCHours(0, 0, 0, 0);

const query = `
query {
  
  tokenDayDatas(first: 1000 where: {date: ${start / 1000} } orderBy:volumeUSD orderDirection:desc) {
      date
      volumeUSD
    priceUSD
    token{id
          name
          symbol
    decimals}
      
        
  }

}`;
export default async function useRandomlySelected0Volume(tokensLength: number) {
  const result = await useUniswapSubgraph(query);

  let tokens: any = result.data;

  tokens = format(tokens);
  tokens = removeBlueChips(tokens);
  tokens = removeStables(tokens);
  tokens = removeVolume(tokens);
  tokens = removeSignOfDerivInTokenName(tokens);
  tokens = removeDuplicates(tokens);
  tokens = shuffleTokens(tokens);
  tokens = tokens.slice(0, tokensLength);

  return tokens;
}

function format(tokenDayDatas: any): any {
  let tokens = [];
  for (let i = 0; i < tokenDayDatas.length; i++) {
    let token = {
      id: tokenDayDatas.token.id,
      name: tokenDayDatas.token.name,
      symbol: tokenDayDatas.token.symbol,
      volumeUSD: tokenDayDatas.volumeUSD,
      /* to get the volume of ETH from the broken subgraph its 
    a = volume / tokenPrice
    b = a / 10^18 */
      stratergySpecificDataDes: "",
      stratergySpecificData: "",
    };
    tokens.push(token);
  }

  return tokens;
}
