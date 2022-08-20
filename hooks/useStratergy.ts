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

async function findStratergy(stratergy: string, config: any) {
  switch (stratergy) {
    case "Tokens most recently added":
      return await executeStratery(config, uniswapMostRecent, sushiswapMostRecent);
    case "Randomly selected tokens with minimum $100 volume":
      return await executeStratery(config, uniswapRandomlySelected100Volume, sushiswapRandomlySelected100Volume);
    case "Randomly selected tokens with $0 volume":
      return await executeStratery(config, uniswapRandomlySelected0Volume, sushiswapRandomlySelected0Volume);
    case "Randomly selected tokens all":
      return await executeStratery(config, uniswapRandomlySelected, sushiswapRandomlySelected);
    default:
  }
}
async function executeStratery(config: any, uniswapFunction: Function, sushiswapFunction: Function) {
  let tokens: any;
  if (config.uniswap) {
    tokens.push(await uniswapFunction());
  }
  if (config.sushiswap) {
    tokens.push(await sushiswapFunction());
  }
  return tokens;
}

export default function useStratergy(stratergy: string, config: any) {
  const [stratResult, setStratResult] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    _stratergy();
    async function _stratergy() {
      try {
        setLoading("true");
        const _result: any = await findStratergy(stratergy, config);
        setStratResult(_result);
      } catch (error) {
        setLoading("null");
      }
    }
  }, [stratergy]);

  return [stratResult, loading];
}
