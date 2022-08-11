import { createClient } from "urql";
import { useEffect, useState } from "react";
import useRandomlySelected100Volume from "./stratergies/useRandomlySelected100Volume";
import useMostRecent from "./stratergies/useMostRecent";
import useRandomlySelected0Volume from "./stratergies/useRandomlySelected0Volume";
import useRandomlySelected from "./stratergies/useRandomlySelected";

async function _executeStratergy(stratergy: string, tokensLength: number) {
  switch (stratergy) {
    case "Randomly selected tokens with minimum $100 volume":
      return await useRandomlySelected100Volume(tokensLength);
    case "Randomly selected tokens with $0 volume":
      return await useRandomlySelected0Volume(tokensLength);
    case "Randomly selected tokens all":
      return await useRandomlySelected(tokensLength);
    case "Tokens most recently added to Uniswap":
      return await useMostRecent(tokensLength);
    default:
  }
}
export default function useStratergy(stratergy: string, tokensLength: number) {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    executeStratergy();
    async function executeStratergy() {
      try {
        setLoading("true");
        const _result: any = await _executeStratergy(stratergy, tokensLength);
        setTokens(_result);
      } catch (error) {
        setLoading("null");
      }
    }
  }, [stratergy]);

  return [tokens, loading, setTokens];
}
