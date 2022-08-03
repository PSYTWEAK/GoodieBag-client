import { createClient } from "urql";
import { useEffect, useState } from "react";
import useRandomlySelected from "./stratergies/useRandomlySelected";
import useMostRecent from "./stratergies/useMostRecent";

async function _executeStratergy(stratergy: string) {
  switch (stratergy) {
    case "Randomly selected tokens with minimum $100 volume":
      return await useRandomlySelected();
    case "Tokens added to Uniswap this week":
      return await useMostRecent();
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
