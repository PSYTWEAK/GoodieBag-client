
import uniswapSubgraph from "../../subgraphs/uniswapSubgraph";
import { weth } from ".././globals";
import { removeLowVolume, combineUSDVolumeThenRemoveDuplicates, removeBlueChips, removeStables, removeSignOfDerivInTokenName, removeNoneEthPools, shuffleTokens, sortTokensByCreatedAt } from ".././filters";
import sushiswapSubgraph from "../../subgraphs/sushiswapSubgraph";
import { formatUniswapSubgraphVolume } from ".././helpers";

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

  let tokens: any = result;
  tokens = combineUSDVolumeThenRemoveDuplicates(tokens);
  tokens = removeBlueChips(tokens);
  tokens = removeStables(tokens);
  tokens = removeSignOfDerivInTokenName(tokens);
  tokens = sortTokensByCreatedAt(tokens);

  return tokens;
}

async function querySubgraphs(config: any) {
  let tokens: any = [];

  if (config.subgraphs.uniswap) {
    try {
      let result = await uniswapSubgraph(uniQuery);

      result = removeNoneEthPools(result.data.pools);

      result ? tokens.push(...formatUni(result)) : null;
    } catch (err) {
      console.log(err);
    }
  }

  if (config.subgraphs.sushiswap) {
    try {
      let result = await sushiswapSubgraph(sushiQuery);

      result = removeNoneEthPools(result.data.pairs);

      result ? tokens.push(...formatSushi(result)) : null;
    } catch (err) {
      console.log(err);
    }
  }

  return tokens;
}



function formatUni(pools: any): any {
  let tokens = [];
  for (let i = 0; i < pools.length; i++) {
    let token = {
      id: pools[i].token0.id === weth ? pools[i].token1.id : pools[i].token0.id,
      name: pools[i].token0.id === weth ? pools[i].token1.name : pools[i].token0.name,
      symbol: pools[i].token0.id === weth ? pools[i].token1.symbol : pools[i].token0.name,
      volumeUSD: formatUniswapSubgraphVolume(pools[i].volumeUSD),
      protocol: "Uniswap V3",
      stratergySpecificDataDes: `Added to DEX at`,
      stratergySpecificData: `${date(pools[i].createdAtTimestamp)}`,
      createdAtTimestamp: pools[i].createdAtTimestamp,
      hasCalldata: "null"
    };

    if (token.id) {
      tokens.push(token);
    }
  }

  return tokens;
}

function formatSushi(pairs: any): any {
  let tokens = [];
  for (let i = 0; i < pairs.length; i++) {
    let token = {
      id: pairs[i].token0.id === weth ? pairs[i].token1.id : pairs[i].token0.id,
      name: pairs[i].token0.id === weth ? pairs[i].token1.name : pairs[i].token0.name,
      symbol: pairs[i].token0.id === weth ? pairs[i].token1.symbol : pairs[i].token0.name,
      volumeUSD: pairs[i].volumeUSD,
      protocol: "Sushiswap",
      stratergySpecificDataDes: `Added to DEX at`,
      stratergySpecificData: `${date(pairs[i].createdAtTimestamp)}`,
      createdAtTimestamp: pairs[i].createdAtTimestamp,
      hasCalldata: "null"
    };

    if (token.id) {
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
