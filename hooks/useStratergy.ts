import { createClient } from "urql";
import { useEffect, useState } from "react";
import useArbitrumSubgraph from "./subgraph/useArbitrumSubgraph";
import useRandomlySelected from "./useRandomlySelected";

const GRAPHURL = "https://api.thegraph.com/subgraphs/name/benjaminlu/arbitrum-one-uniswap-v3";

async function _executeStratergy(stratergy: string) {
  switch (stratergy) {
    case "Randomly Selected":
      return await useRandomlySelected();
    case "Newly Added Tokens":
      break;
    default:
  }
}

export default function useStratergy(stratergy: string) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    executeStratergy();
    async function executeStratergy() {
      try {
        setLoading("true");
        const _result: any = await _executeStratergy(stratergy);
        setResult(_result);
      } catch (error) {
        setLoading("null");
      }
    }
  }, [stratergy]);

  return [result, loading];
}
