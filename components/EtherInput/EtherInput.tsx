import React from "react";
import EtherAmount from "./EtherAmount";
import styles from "../../styles/Home.module.css";
export function EtherInput({}) {
  return (
    <>
      {" "}
      <div className={styles.grid}>
        <EtherAmount />
        <p>ETH</p>
      </div>{" "}
    </>
  );
}
