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
        _result.length ? setLoading("done") : setLoading("null");
        setUsers(_result);
      } catch (error) {
        setLoading("null");
      }
    }
  }, []);

  return [users, loading];
}