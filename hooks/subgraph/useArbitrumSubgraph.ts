import { createClient } from "urql";

import GRAPHURL from "../connectors";

export default function querySubgraph() {
  return async () => {
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

    const data = await client.query(tokensQuery).toPromise();
    return data;
  };
}
