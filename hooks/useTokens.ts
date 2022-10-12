import { useEffect, useState } from "react";

export default function useTokens(config: any, stratResult: any, loading: any, setState: any) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (loading === "done") {
      setState((prevState: any) => {
        return { ...prevState, tokens: stratResult.slice(0, config.tokensLength) };
      });
    }
  }, [stratResult, config.tokensLength, loading]);

  useEffect(() => {

    setState((prevState: any) => {
      return { ...prevState, tokens: [] };
    });
  }, [config.stratergy]);

  return [tokens, setTokens];
}
