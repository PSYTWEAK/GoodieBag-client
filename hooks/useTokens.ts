import { useEffect, useState } from "react";

export default function useTokens(stratergy: string, stratResult: any, tokensLength: number, loading: any) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (loading === "done") {
      setTokens(stratResult.slice(0, tokensLength));
    }
  }, [stratResult, tokensLength, loading]);

  useEffect(() => {
    setTokens([]);
  }, [stratergy]);

  return [tokens, setTokens];
}
