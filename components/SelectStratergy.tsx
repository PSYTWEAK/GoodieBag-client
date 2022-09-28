import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { statergys } from "../globals";
import styles from '../styles/Home.module.css';

export function SelectStratergy({ stratergy, setStratergy }: { stratergy: any; setStratergy: any }) {
  return (
    <div>
      <FormControl
        sx={{
          m: 2,
          width: 300,
        }}

      >
        <InputLabel id="demo-multiple-name-label" >Select Stratergy</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={stratergy} label="Select Stratergy" onChange={(e) => setStratergy(e.target.value)} className={styles.select}>
          {statergys.map((strat: string, i: number) => {
            return <MenuItem key={i} value={strat}>{strat}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
