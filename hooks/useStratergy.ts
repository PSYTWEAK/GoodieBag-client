import { createClient } from "urql";
import { useEffect, useState } from "react";
import uniswapRandomlySelected100Volume from "./stratergies/uniswap/useRandomlySelected100Volume";
import uniswapMostRecent from "./stratergies/uniswap/useMostRecent";
import uniswapRandomlySelected0Volume from "./stratergies/uniswap/useRandomlySelected0Volume";
import uniswapRandomlySelected from "./stratergies/uniswap/useRandomlySelected";

import sushiswapRandomlySelected100Volume from "./stratergies/sushiswap/useRandomlySelected100Volume";
import sushiswapMostRecent from "./stratergies/sushiswap/useMostRecent";
import sushiswapRandomlySelected0Volume from "./stratergies/sushiswap/useRandomlySelected0Volume";
import sushiswapRandomlySelected from "./stratergies/sushiswap/useRandomlySelected";

async function _executeStratergy(stratergy: string) {
  switch (stratergy) {
    case "Uniswap - Tokens most recently added":
      return await uniswapMostRecent();
    case "Uniswap - Randomly selected tokens with minimum $100 volume":
      return await uniswapRandomlySelected100Volume();
    case "Uniswap - Randomly selected tokens with $0 volume":
      return await uniswapRandomlySelected0Volume();
    case "Uniswap - Randomly selected tokens all":
      return await uniswapRandomlySelected();

    case "Sushiswap - Tokens most recently added":
      return await sushiswapMostRecent();
    case "Sushiswap - Randomly selected tokens with minimum $100 volume":
      return await sushiswapRandomlySelected100Volume();
    case "Sushiswap - Randomly selected tokens with $0 volume":
      return await sushiswapRandomlySelected0Volume();
    case "Sushiswap - Randomly selected tokens all":
      return await sushiswapRandomlySelected();

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
