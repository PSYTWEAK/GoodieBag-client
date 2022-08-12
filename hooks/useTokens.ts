import { useEffect, useState } from "react";

export default function useTokens(stratResult: any, tokensLength: number) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    if (!!stratResult === true) {
      console.log("twas true");
      console.log(stratResult);
      setTokens(stratResult.slice(0, tokensLength));
    }
  }, [stratResult, tokensLength]);

  return [tokens, setTokens];
}
