import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { statergys } from "../globals";
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
      <p>Select Stratergy</p>
      {statergys.map((strat: any, i: number) => {
        return (
          <Grid item xs={8} width="max">
            <div className={styles.stratCard} onClick={(e) => setConfig((prevState: any) => {
              return { ...prevState, stratergy: strat }
            })}>
              <div className={styles.upperTokenCard}>
                <p>{strat}</p>
              </div>
            </div>{" "}
          </Grid>
        );
      })}
    </>
  );
};




