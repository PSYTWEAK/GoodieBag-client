import { createClient } from "urql";
import { useEffect, useState } from "react";
import useRandomlySelected from "./stratergies/useRandomlySelected";

async function _executeStratergy(stratergy: string) {
  switch (stratergy) {
    case "Randomly selected tokens with minimum $100 volume":
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
