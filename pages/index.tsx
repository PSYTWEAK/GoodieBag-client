import { Arrow } from './../components/Arrow';
import { CardHeader } from "./../components/CardHeader";
import { Settings } from "./../components/Settings";
import { SelectStratergy } from "./../components/SelectStratergy";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import useStratergy from "../hooks/useStratergy";
import { EtherInput } from "../components/EtherInput/EtherInput";
import Tokens from "../components/Tokens/Tokens";
import { BuyTokens } from "../components/BuyTokens";
import useTokens from "../hooks/useTokens";
import useGenerateCalldata from "../hooks/calldataForSwaps/useGenerateCalldata";


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

  const [state, setState] = useState({
    amountETHIn: 0,
    tokens: [],
  })

  useTokens(config, stratResult, loading, setState);

  const [settingsActive, setSettingsActive] = useState(false);

  const { txObject, generateCallData } = useGenerateCalldata();

  useEffect(() => {

  }, [settingsActive]);




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
                    <EtherInput state={state} setState={setState} slippage={config.slippage} generateCallData={generateCallData} />
                    <BuyTokens state={state} loading={loading} txObject={txObject} />
                  </div>
                  <Arrow />

                  <Tokens state={state} setState={setState} loading={loading} />
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
