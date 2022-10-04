import React from "react";
import { SelectTokenListLength } from "./SelectTokenListLength";
import { SlippageInput } from "./SlippageInput";
import { DexCheckList } from "./DexChecklist";
export function Settings({
  setSettingsActive,
  config,
  setConfig,
}: {
  setSettingsActive: any;
  config: any;
  setConfig: any;
}) {
  return (
    <>
      {" "}
      <DexCheckList config={config.subgraphs} setConfig={setConfig} />
      <SelectTokenListLength tokensLength={config.tokensLength} setConfig={setConfig} />
      <SlippageInput slippage={config.slippage} setConfig={setConfig} />
    </>
  );
}
