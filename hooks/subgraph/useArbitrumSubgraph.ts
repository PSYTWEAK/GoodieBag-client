import { createClient } from "urql";

const GRAPHURL = "https://api.thegraph.com/subgraphs/name/benjaminlu/arbitrum-one-uniswap-v3";

export default async function useArbitrumSubgraph() {
  try {
    const tokensQuery = `
            query {
                poolDayDatas(first: 1000 where: {date: 1658707200 } orderBy:volumeUSD orderDirection:desc) {
                    date
                    volumeUSD
                    pool {
                     id
                    liquidity
                      token0 {
                        id
                        name
                      }
                   token1{
                      id
                      name
                      }
                    }
          
              }
            }`;

    const client = createClient({
      url: GRAPHURL,
    });

    const data: any = await client.query(tokensQuery).toPromise();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
