import { useEffect, useState } from "react";

export default function useTokens(stratergy: string, stratResult: any, tokensLength: number) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (!!stratResult === true) {
      console.log();
      setTokens(stratResult.slice(0, tokensLength));
    }
  }, [stratResult, tokensLength]);

  useEffect(() => {
    setTokens([]);
  }, [stratergy]);

  return [tokens, setTokens];
}
