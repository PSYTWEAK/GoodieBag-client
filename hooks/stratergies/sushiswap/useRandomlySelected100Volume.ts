import { createClient } from "urql";
import { useEffect, useState } from "react";
import useSushiswapSubgraph from "../../subgraphs/useSushiswapSubgraph";
import { blueChips, lowVolume, weth, stables } from ".././globals";
import { removeDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens, removeVolume } from ".././filters";
import { removeLowVolume } from "../filters";

var start: any = new Date();
start.setUTCHours(0, 0, 0, 0);

const query = `
  query 
  {
    tokenDaySnapshots(first:100 where: {date: ${start / 1000} } orderBy: volumeUSD orderDirection:desc) {
      token{
        id
        name
        symbol
      }
      volumeUSD
    }
  }
  `;
export default async function useRandomlySelected100Volume() {
  const result = await useSushiswapSubgraph(query);

  let tokens: any = result.data;

  tokens = format(tokens);
  tokens = removeBlueChips(tokens);
  tokens = removeStables(tokens);
  tokens = removeLowVolume(tokens);
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
  return tokens;
}
