import React from "react";
import { BackToSelectButton } from "./BackToSelectButton";
import { SettingsButton } from "./SettingsButton";

import styles from "../styles/Home.module.css";
import { BackToTokenList } from "./BackToTokenList";
export function CardHeader({ stratergy, setStratergy, settingsActive, setSettingsActive }: { stratergy: any; setStratergy: any; settingsActive: Boolean; setSettingsActive: any }) {
  return (
    <div className={styles.cardHeader}>
      {" "}
      {settingsActive && (
        <div className={styles.backButton}>
          <BackToTokenList setSettingsActive={setSettingsActive} />
        </div>
      )}
      {stratergy && !settingsActive && (
        <div className={styles.backButton}>
          {" "}
          <BackToSelectButton setStratergy={setStratergy} />
        </div>
      )}{" "}
      {!settingsActive && (
        <div className={styles.settingsButton}>
          <SettingsButton setSettingsActive={setSettingsActive} />
        </div>
      )}{" "}
    </div>
  );
}
