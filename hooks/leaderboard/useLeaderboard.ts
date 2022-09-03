import { useEffect, useState } from "react";
import useLeaderboardSubgraph from "../subgraphs/useLeaderboardSubgraph";

async function queryLeaderboard() {
  let result = await useLeaderboardSubgraph();

  return result;
}

export default function useLeaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    _stratergy();
    async function _stratergy() {
      try {
        setLoading("true");
        const _result: any = await queryLeaderboard();
        _result ? setLoading("done") : setLoading("null");
        setUsers(_result.data.users);
      } catch (error) {
        setLoading("null");
      }
    }
  }, []);

  return [users, loading];
}