import { createClient } from "urql";

import { UNISWAP_SUBGRAPH } from "../../globals";

export default async function useUniswapSubgraph(query: string) {
  try {
    const client = createClient({
      url: UNISWAP_SUBGRAPH,
    });

    const data: any = await client.query(query).toPromise();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
