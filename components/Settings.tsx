import React from "react";
import { BackToTokenList } from "./BackToTokenList";
import { SelectTokenListLength } from "./SelectTokenListLength";
export function Settings({ setSettingsActive, setTokensLength }: { setSettingsActive: any; setTokensLength: any }) {
  return (
    <>
      <BackToTokenList setSettingsActive={setSettingsActive} />
      <p>Slippage</p>
      <SelectTokenListLength setTokensLength={setTokensLength} />
      <p>Number of tokens</p>
    </>
  );
}
