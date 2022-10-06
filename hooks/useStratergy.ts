import { createClient } from "urql";
import { useEffect, useState } from "react";
import RandomlySelected100Volume from "./stratergies/uniswap/useRandomlySelected100Volume";
import MostRecent from "./stratergies/uniswap/useMostRecent";
import RandomlySelected0Volume from "./stratergies/uniswap/useRandomlySelected0Volume";
import RandomlySelected from "./stratergies/uniswap/useRandomlySelected";
import HighestVolume from "./stratergies/uniswap/useHighestVolume";
import ArbitrumOdyssey from "./stratergies/uniswap/useArbitrumOdyssey";

async function findStratergy(stratergy: string, config: any) {
  switch (stratergy) {
    case "24 hour highest volume 💪":
      return await HighestVolume(config);
    case "Recently added to a DEX 👶":
      return await MostRecent(config);
    case "Randomly selected 🎲":
      return await RandomlySelected100Volume(config);
    case "Minimum $100 24 hour volume 🎲":
      return await RandomlySelected0Volume(config);
    case "Maximum $0 24 hour volume 🤪🎲":
      return await RandomlySelected(config);
    case "The Arbitrum Odyssey 🧑‍🚀":
      return await ArbitrumOdyssey();
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
