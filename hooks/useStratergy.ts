import { createClient } from "urql";
import { useEffect, useState } from "react";
import useRandomlySelected from "./stratergies/useRandomlySelected";
import useMostRecent from "./stratergies/useMostRecent";

async function _executeStratergy(stratergy: string) {
  switch (stratergy) {
    case "Randomly selected tokens with minimum $100 volume":
      return await useRandomlySelected();
    case "Tokens most recently added to Uniswap":
      return await useMostRecent();
    default:
  }
}

export default function useStratergy(stratergy: string) {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    executeStratergy();
    async function executeStratergy() {
      try {
        setLoading("true");
        const _result: any = await _executeStratergy(stratergy);
        setTokens(_result);
      } catch (error) {
        setLoading("null");
      }
    }
  }, [stratergy]);

  return [tokens, loading, setTokens];
}
