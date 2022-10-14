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
import { Alert } from '@mui/material';
import { useAccount, useProvider } from 'wagmi';


const Home: NextPage = () => {

  const provider = useProvider();
  const { address, isConnecting, isDisconnected } = useAccount()

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
    provider: provider,
    address: address,
    amountETHIn: null,
    tokens: [],
  })

  useTokens(config, stratResult, loading, setState);

  const [settingsActive, setSettingsActive] = useState(false);

  const { txObject, generateCallData } = useGenerateCalldata(state, setState, config);

  useEffect(() => {

  }, [settingsActive]);

  const alertStyle = {
    backgroundColor: "rgba(210, 238, 255, 1)",
    margin: "0px",
    width: "95%",
    position: "absolute",
  }

  return (
    <div className={styles.container}>
      <Alert severity="warning" style={{
        backgroundColor: "rgba(210, 238, 255, 1)",
        margin: "0px",
        width: "95%",
        position: "absolute",
      }} >Only trade what you&apos;re willing to lose. Goodiebag is still in development and has not been audited.</Alert>
      <main className={styles.main}>
        <div className={styles.card}>
          <CardHeader stratergy={config.stratergy} setConfig={setConfig} setState={setState} settingsActive={settingsActive} setSettingsActive={setSettingsActive} />

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
    </div >
  );
};

export default Home;
