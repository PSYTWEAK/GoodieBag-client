import { createClient } from "urql";

import { SUSHISWAP_SUBGRAPH } from "../../globals";

export default async function useSushiswapSubgraph(query: string) {
  try {
    const client = createClient({
      url: SUSHISWAP_SUBGRAPH,
    });

    const data: any = await client.query(query).toPromise();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
