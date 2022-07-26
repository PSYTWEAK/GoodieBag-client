import { FindTokensButton } from "./FindTokensButton";
import { EtherInput } from "./EtherInput/EtherInput";
import React from "react";
import EtherAmount from "./EtherInput/EtherAmount";
import styles from "../styles/Home.module.css";
import TokensReadyToBuy from "./TokensReadyToBuy";
import { Button } from "@mui/material";

export function SwapperCard(tokens: any) {
  return (
    <div className={styles.card}>
      <EtherInput />
      {/* <TokensReadyToBuy tokens={tokens} /> */}
      <FindTokensButton />
    </div>
  );
}
