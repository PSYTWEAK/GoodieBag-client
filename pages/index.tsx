import { CardHeader } from "./../components/CardHeader";
import { Settings } from "./../components/Settings";
import { SelectStratergy } from "./../components/SelectStratergy";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import useStratergy from "../hooks/useStratergy";
import { EtherInput } from "../components/EtherInput/EtherInput";
import Tokens from "../components/Tokens/Tokens";
import { BuyTokens } from "../components/BuyTokens";
import Logo from "../components/Logo";
import useTokens from "../hooks/useTokens";

const Home: NextPage = () => {
  const [stratergy, setStratergy] = useState("");
  const [tokensLength, setTokensLength] = useState(10);
  const [slippage, setSlippage] = useState(10);
  const [config, setConfig] = useState({ uniswap: true, sushiswap: true });
  const [stratResult, loading] = useStratergy(stratergy, config);
  const [tokens, setTokens] = useTokens(stratergy, stratResult, tokensLength, loading);
  const [amountETHIn, setAmountETHIn] = useState(null);
  const [settingsActive, setSettingsActive] = useState(false);

  const [generatingCalldata, setGeneratingCalldata] = useState("false");


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {" "}
        <h1 className={styles.title}>
          {" "}
          <Logo />
        </h1>
        <div className={styles.card}>
          <CardHeader stratergy={stratergy} setStratergy={setStratergy} settingsActive={settingsActive} setSettingsActive={setSettingsActive} />

          {stratergy && (
            <>
              {" "}
              {!settingsActive && !settingsActive && (
                <>
                  <EtherInput amountETHIn={amountETHIn} setAmountETHIn={setAmountETHIn} tokens={tokens} setTokens={setTokens} slippage={slippage} />
                  <BuyTokens tokens={tokens} setTokens={setTokens} loading={loading} slippage={slippage} amountETHIn={amountETHIn} generatingCalldata={generatingCalldata} setGeneratingCalldata={setGeneratingCalldata} />
                  <Tokens tokens={tokens} loading={loading} setTokens={setTokens} />
                </>
              )}
            </>
          )}



          {!stratergy && !settingsActive && (
            <>
              <SelectStratergy stratergy={stratergy} setStratergy={setStratergy} />
            </>
          )}
          {settingsActive && (
            <Settings
              setSettingsActive={setSettingsActive}
              tokensLength={tokensLength}
              setTokensLength={setTokensLength}
              slippage={slippage}
              setSlippage={setSlippage}
              config={config}
              setConfig={setConfig}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
