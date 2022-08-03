import { createClient } from "urql";

import { GRAPHURL } from "../../globals";

export default async function useMostRecentPools() {
  try {
    const tokensQuery = `
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
