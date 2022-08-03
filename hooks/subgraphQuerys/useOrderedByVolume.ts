import { createClient } from "urql";

import { GRAPHURL } from "../../globals";

export default async function useOrderedByVolume() {
  try {
    const tokensQuery = `
            query {
                poolDayDatas(first: 1000 where: {date: 1659484800 } orderBy:volumeUSD orderDirection:desc) {
                    date
                    volumeUSD
                    pool {
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
