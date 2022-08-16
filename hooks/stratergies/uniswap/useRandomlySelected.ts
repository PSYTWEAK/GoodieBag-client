import { createClient } from "urql";
import { useEffect, useState } from "react";
import useUniswapSubgraph from "../../subgraphs/useUniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from ".././globals";
import { removeDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens, removeVolume } from ".././filters";

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
export default async function useRandomlySelected() {
  const result = await useUniswapSubgraph(query);

  let tokens: any = result.data;

  tokens = format(tokens);
  tokens = removeBlueChips(tokens);
  tokens = removeStables(tokens);
  tokens = removeSignOfDerivInTokenName(tokens);
  tokens = removeDuplicates(tokens);
  tokens = shuffleTokens(tokens);

  return tokens;
}

function format(data: any): any {
  let tokens = [];
  for (let i = 0; i < data.tokenDayDatas.length; i++) {
    let token = {
      id: data.tokenDayDatas[i].token.id,
      name: data.tokenDayDatas[i].token.name,
      symbol: data.tokenDayDatas[i].token.symbol,
      volumeUSD: data.tokenDayDatas[i].volumeUSD,
      protocol: "Uniswap V3",
      /* to get the volume of ETH from the broken subgraph its 
    a = volume / tokenPrice
    b = a / 10^18 */
      stratergySpecificDataDes: "",
      stratergySpecificData: "",
    };
    if (token.id != weth) {
      tokens.push(token);
    }
  }
  console.log(tokens);
  return tokens;
}
