import { createClient } from "urql";

import { GRAPHURL } from "../../globals";

export default async function useUniswapSubgraph(query: string) {
  try {
    const client = createClient({
      url: GRAPHURL,
    });

    const data: any = await client.query(query).toPromise();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
