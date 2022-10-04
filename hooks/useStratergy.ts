import { createClient } from "urql";
import { useEffect, useState } from "react";
import RandomlySelected100Volume from "./stratergies/uniswap/useRandomlySelected100Volume";
import MostRecent from "./stratergies/uniswap/useMostRecent";
import RandomlySelected0Volume from "./stratergies/uniswap/useRandomlySelected0Volume";
import RandomlySelected from "./stratergies/uniswap/useRandomlySelected";
import HighestVolume from "./stratergies/uniswap/useHighestVolume";

async function findStratergy(stratergy: string, config: any) {
  console.log("stratergy", stratergy);
  switch (stratergy) {
    case "Tokens with highest volume":
      return await HighestVolume(config);
    case "Tokens most recently added":
      return await MostRecent(config);
    case "Randomly selected tokens with minimum $100 volume":
      return await RandomlySelected100Volume(config);
    case "Randomly selected tokens with $0 volume":
      return await RandomlySelected0Volume(config);
    case "Randomly selected tokens all":
      return await RandomlySelected(config);
    default:
  }
}

export default function useStratergy(stratergy: string, config: any) {
  const [stratResult, setStratResult] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    _stratergy();
    async function _stratergy() {
      if (stratergy !== "") {
        try {
          setLoading("true");
          const _result: any = await findStratergy(stratergy, config);
          setStratResult(_result);
          _result ? setLoading("done") : setLoading("null");


        } catch (error) {
          setLoading("null");
        }
      }
    }
  }, [stratergy]);

  return [stratResult, loading];
}
