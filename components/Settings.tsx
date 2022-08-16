import React from "react";
import { BackToTokenList } from "./BackToTokenList";
import { SelectTokenListLength } from "./SelectTokenListLength";
import { SlippageInput } from "./SlippageInput";
import { DexCheckList } from "./DexChecklist";
export function Settings({
  setSettingsActive,
  tokensLength,
  setTokensLength,
  slippage,
  setSlippage,
}: {
  setSettingsActive: any;
  tokensLength: any;
  setTokensLength: any;
  slippage: number;
  setSlippage: any;
}) {
  return (
    <>
      {" "}
      <BackToTokenList setSettingsActive={setSettingsActive} />
      <DexCheckList />
      <SelectTokenListLength tokensLength={tokensLength} setTokensLength={setTokensLength} /> <SlippageInput slippage={slippage} setSlippage={setSlippage} />
    </>
  );
}
