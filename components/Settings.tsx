import React from "react";
import { SelectTokenListLength } from "./SelectTokenListLength";
import { SlippageInput } from "./SlippageInput";
import { DexCheckList } from "./DexChecklist";
export function Settings({
  setSettingsActive,
  tokensLength,
  setTokensLength,
  slippage,
  setSlippage,
  config,
  setConfig,
}: {
  setSettingsActive: any;
  tokensLength: any;
  setTokensLength: any;
  slippage: number;
  setSlippage: any;
  config: any;
  setConfig: any;
}) {
  return (
    <>
      {" "}
      <DexCheckList config={config} setConfig={setConfig} />
      <SelectTokenListLength tokensLength={tokensLength} setTokensLength={setTokensLength} />
      <SlippageInput slippage={slippage} setSlippage={setSlippage} />
    </>
  );
}
