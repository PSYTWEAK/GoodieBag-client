import { createClient } from "urql";
import { useEffect, useState } from "react";
import useRandomlySelected100Volume from "./stratergies/sushiswap/useRandomlySelected100Volume";
import useMostRecent from "./stratergies/sushiswap/useMostRecent";
import useRandomlySelected0Volume from "./stratergies/sushiswap/useRandomlySelected0Volume";
import useRandomlySelected from "./stratergies/sushiswap/useRandomlySelected";

async function _executeStratergy(stratergy: string) {
  switch (stratergy) {
    case "Randomly selected tokens with minimum $100 volume":
      return await useRandomlySelected100Volume();
    case "Randomly selected tokens with $0 volume":
      return await useRandomlySelected0Volume();
    case "Randomly selected tokens all":
      return await useRandomlySelected();
    case "Tokens most recently added to Uniswap":
      return await useMostRecent();
    default:
  }
}
export default function useStratergy(stratergy: string) {
  const [stratResult, setStratResult] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    executeStratergy();
    async function executeStratergy() {
      try {
        setLoading("true");
        const _result: any = await _executeStratergy(stratergy);
        setStratResult(_result);
      } catch (error) {
        setLoading("null");
      }
    }
  }, [stratergy]);

  return [stratResult, loading];
}
