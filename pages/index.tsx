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
import useGenerateCalldata from "../hooks/calldataForSwaps/useGenerateCalldata";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const Home: NextPage = () => {

  const [config, setConfig] = useState({
    stratergy: "",
    subgraphs: { uniswap: true, sushiswap: true },
    tokensLength: 10,
    slippage: 10,
    minVolume: 0,
    maxVolume: 0,
  });

  const [stratResult, loading] = useStratergy(config.stratergy, config);
  const [tokens, setTokens] = useTokens(config.stratergy, stratResult, config.tokensLength, loading);
  const [amountETHIn, setAmountETHIn] = useState(null);
  const [settingsActive, setSettingsActive] = useState(false);


  const { txObject, generateCallData } = useGenerateCalldata();


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.card}>
          <CardHeader stratergy={config.stratergy} setConfig={setConfig} settingsActive={settingsActive} setSettingsActive={setSettingsActive} />

          {config.stratergy && (
            <>
              {" "}
              {!settingsActive && !settingsActive && (
                <>
                  <div className={styles.swapInput}>
                    <EtherInput amountETHIn={amountETHIn} setAmountETHIn={setAmountETHIn} tokens={tokens} setTokens={setTokens} slippage={config.slippage} generateCallData={generateCallData} />
                    <BuyTokens tokens={tokens} loading={loading} amountETHIn={amountETHIn} txObject={txObject} />
                  </div>
                  <div className={styles.downArrow}>
                    <ArrowDownwardIcon />
                  </div>

                  <Tokens tokens={tokens} loading={loading} setTokens={setTokens} amountETHIn={amountETHIn} />
                </>
              )}
            </>
          )}



          {!config.stratergy && !settingsActive && (
            <>
              <SelectStratergy stratergy={config.stratergy} setConfig={setConfig} />
            </>
          )}
          {settingsActive && (
            <Settings
              setSettingsActive={setSettingsActive}
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
