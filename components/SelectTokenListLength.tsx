import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { statergys } from "../globals";

var selection = Array.from(Array(50).keys());

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
        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Number of tokens" value={tokensLength} onChange={(e) => setTokensLength(e.target.value)}>
          {selection.map((num: number) => {
            return <MenuItem value={num}>{num}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
