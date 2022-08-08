import React from "react";
import { BackToTokenList } from "./BackToTokenList";
export function Settings({ setSettingsActive }: { setSettingsActive: any }) {
  return (
    <>
      <BackToTokenList setSettingsActive={setSettingsActive} />
      <p>Slippage</p>

      <p>Number of tokens</p>
    </>
  );
}
