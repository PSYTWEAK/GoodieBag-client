import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { statergys } from "../globals";
import styles from '../styles/Home.module.css';

const selection = Array.from(Array(61).keys()).slice(1);

export function SelectTokenListLength({ tokensLength, setTokensLength }: { tokensLength: any; setTokensLength: any }) {
  return (
    <div>
      <FormControl
        sx={{
          m: 2,
          width: 300,
        }}
      >
        <InputLabel id="demo-multiple-name-label">Number of Tokens</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Number of tokens" value={tokensLength} onChange={(e) => setTokensLength(e.target.value)} className={styles.select}>
          {selection.map((num: number, i: number) => {
            return <MenuItem key={i} value={num}>{num}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
