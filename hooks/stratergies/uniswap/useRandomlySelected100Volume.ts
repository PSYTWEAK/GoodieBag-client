
import uniswapSubgraph from "../../subgraphs/uniswapSubgraph";
import { blueChips, lowVolume, weth, stables } from ".././globals";
import { removeDuplicates, combineUSDVolumeThenRemoveDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens, removeVolume, removeLowVolume } from ".././filters";
import sushiswapSubgraph from "../../subgraphs/sushiswapSubgraph";
import { formatUniswapSubgraphVolume } from "../helpers"

var start: any = new Date();
start.setUTCHours(0, 0, 0, 0);

const uniQuery = `
query {
  
  tokenDayDatas(first: 1000 where: {date: ${start / 1000} } orderBy:volumeUSD orderDirection:desc) {
      date
      volumeUSD
    priceUSD
    token{id
          name
          symbol
          decimals
  }
      
        
  }

}`;

const sushiQuery = `
  query 
  {
    tokenDaySnapshots(first:1000 where: {date: ${start / 1000} } orderBy: volumeUSD orderDirection:desc) {
      token{
        id
        name
        symbol
        decimals
      }
      volumeUSD
    }
  }
  `;
export default async function useRandomlySelected(config: any) {
  const result = await querySubgraphs(config);
  console.log("result", result);
  let tokens: any = result;

  tokens = removeBlueChips(tokens);
  tokens = removeStables(tokens);
  tokens = removeSignOfDerivInTokenName(tokens); console.log("before", tokens)
  tokens = combineUSDVolumeThenRemoveDuplicates(tokens);
  console.log("after", tokens)
  tokens = removeLowVolume(tokens);
  tokens = shuffleTokens(tokens);

  return tokens;
}

async function querySubgraphs(config: any) {
  let tokens: any = [];

  if (config.subgraphs.uniswap) {
    try {
      let result = await uniswapSubgraph(uniQuery);

      console.log("uniswap", formatUni(result.data));

      result ? tokens.push(...formatUni(result.data)) : null;
    } catch (err) {
      console.log(err);
    }
  }
  if (config.subgraphs.sushiswap) {
    try {
      let result = await sushiswapSubgraph(sushiQuery);

      result ? tokens.push(...formatSushi(result.data)) : null;
    } catch (err) {
      console.log(err);
    }
  }
  return tokens;
}

function formatUni(data: any): any {
  let tokens = [];
  for (let i = 0; i < data.tokenDayDatas.length; i++) {
    let token = {
      id: data.tokenDayDatas[i].token.id,
      name: data.tokenDayDatas[i].token.name,
      symbol: data.tokenDayDatas[i].token.symbol,
      /*   this subgraph data is broken so have to do 
      data.tokenDayDatas[i].volumeUSD / 10^30 * 1.7   */
      volumeUSD: formatUniswapSubgraphVolume(data.tokenDayDatas[i].volumeUSD),
      protocol: "Uniswap V3",
      stratergySpecificDataDes: "",
      stratergySpecificData: "",
      hasCalldata: "null"
    };
    if (token.id != weth) {
      tokens.push(token);
    }
  }
  return tokens;
}

function formatSushi(data: any): any {
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
      hasCalldata: "null"
    };
    if (token.id != weth) {
      tokens.push(token);
    }
  }
  return tokens
}
