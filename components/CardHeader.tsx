import React from "react";
import { BackToSelectStratButton } from "./BackToSelectStratButton";
import { SettingsButton } from "./SettingsButton";

import styles from "../styles/Home.module.css";
import { CloseSettingsButton } from "./CloseSettingsButton";
export function CardHeader({ stratergy, setConfig, settingsActive, setSettingsActive }: { stratergy: any; setConfig: any; settingsActive: Boolean; setSettingsActive: any }) {
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
          <BackToSelectStratButton setConfig={setConfig} />
        </div>
      )}{" "}
      {!settingsActive && (
        <>
          <div className={styles.cardTitle}>
            <p className={styles.cardTitleText}>{stratergy ? stratergy : "Select Stratergy"}</p>
          </div>

          <div className={styles.settingsButton}>
            <SettingsButton setSettingsActive={setSettingsActive} />
          </div></>
      )}{" "}
    </div>
  );
}
