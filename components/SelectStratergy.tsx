import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { statergys, statergyDescriptions } from "../globals";
import styles from '../styles/Home.module.css';

export function SelectStratergy({ stratergy, setConfig }: { stratergy: any; setConfig: any }) {

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} direction="column" marginTop={1.5}>
      {StatergysList(setConfig)}
    </Grid>
  );
}

const StatergysList = (setConfig: any) => {
  return (
    <>

      {statergys.map((strat: any, i: number) => {
        return (
          <Grid key={strat} item xs={8} width="max">
            <div className={styles.stratCard} onClick={(e) => setConfig((prevState: any) => {
              return { ...prevState, stratergy: strat }
            })}>
              <div className={styles.upperStratCard}>
                <p>{strat}</p>
              </div>
              <div className={styles.lowerStratCard}>
                <p>{statergyDescriptions.get(strat)}</p>
              </div>
            </div>{" "}
          </Grid>
        );
      })}
    </>
  );
};




