import { createClient } from "urql";
import { useEffect, useState } from "react";
import useUniswapSubgraph from "../../subgraphs/useUniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from "./globals";
import { removeDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens, removeVolume } from "./filters";

var start: any = new Date();
start.setUTCHours(0, 0, 0, 0);

const query = `
  query 
  {
    tokenDaySnapshots(first:1000 where: {date: ${start / 1000} } orderBy: volumeUSD orderDirection:desc) {
      token{
        id
        name
        symbol
      }
      volumeUSD
    }
  }
  `;
export default async function useRandomlySelected() {
  const result = await useUniswapSubgraph(query);

  let tokens: any = result.data;

  tokens = format(tokens);
  tokens = removeBlueChips(tokens);
  tokens = removeStables(tokens);
  tokens = removeVolume(tokens);
  tokens = removeSignOfDerivInTokenName(tokens);
  tokens = removeDuplicates(tokens);
  tokens = shuffleTokens(tokens);

  return tokens;
}

function format(data: any): any {
  let tokens = [];
  for (let i = 0; i < data.tokenDaySnapshots.length; i++) {
    let token = {
      id: data.tokenDaySnapshots[i].token.id,
      name: data.tokenDaySnapshots[i].token.name,
      symbol: data.tokenDaySnapshots[i].token.symbol,
      volumeUSD: data.tokenDaySnapshots[i].volumeUSD,
      protocol: "Sushiswap",
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
