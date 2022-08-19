import React from "react";
import { BackToSelectStratButton } from "./BackToSelectStratButton";
import { SettingsButton } from "./SettingsButton";

import styles from "../styles/Home.module.css";
import { CloseSettingsButton } from "./CloseSettingsButton";
export function CardHeader({ stratergy, setStratergy, settingsActive, setSettingsActive }: { stratergy: any; setStratergy: any; settingsActive: Boolean; setSettingsActive: any }) {
  return (
    <div className={styles.cardHeader}>
      {" "}
      {settingsActive && (
        <div className={styles.backButton}>
          <CloseSettingsButton setSettingsActive={setSettingsActive} />
        </div>
      )}
      {stratergy && !settingsActive && (
        <div className={styles.backButton}>
          {" "}
          <BackToSelectStratButton setStratergy={setStratergy} />
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
