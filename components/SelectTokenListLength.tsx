import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { globalSettings } from "../globals";
import styles from '../styles/Home.module.css';

const selection = Array.from(Array(globalSettings.maximumTokens).keys()).slice(1);

export function SelectTokenListLength({ tokensLength, setConfig }: { tokensLength: any; setConfig: any }) {
  return (
    <div>
      <FormControl
        sx={{
          m: 2,
          width: 300,
        }}
      >
        <InputLabel id="demo-multiple-name-label">Number of Tokens</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Number of tokens" value={tokensLength}
          onChange={(e) => setConfig((prevState: any) => { return { ...prevState, tokensLength: e.target.value } })}
          className={styles.select}>
          {selection.map((num: number, i: number) => {
            return <MenuItem key={i} value={num}>{num}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
