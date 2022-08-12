import React from "react";
import { BackToTokenList } from "./BackToTokenList";
import { SelectTokenListLength } from "./SelectTokenListLength";
export function Settings({ setSettingsActive, tokensLength, setTokensLength }: { setSettingsActive: any; tokensLength: any; setTokensLength: any }) {
  return (
    <>
      <BackToTokenList setSettingsActive={setSettingsActive} />
      <p>Slippage</p>
      <SelectTokenListLength tokensLength={tokensLength} setTokensLength={setTokensLength} />
      <p>Number of tokens</p>
    </>
  );
}
