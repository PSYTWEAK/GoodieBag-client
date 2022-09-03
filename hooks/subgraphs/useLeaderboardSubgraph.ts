import { createClient } from "urql";

import { LEADERBOARD_SUBGRAPH } from "../../globals";

const query = `
query {
  users(first: 5 orderBy:value orderDirection: desc) {
    id
    value
  }
}
`;

export default async function useLeaderboardSubgraph() {
  try {
    const client = createClient({
      url: LEADERBOARD_SUBGRAPH,
    });

    const data: any = await client.query(query).toPromise();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
