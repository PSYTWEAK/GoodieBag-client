import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { statergys } from "../globals";

var tokensLength = Array.from(Array(50).keys());

export function SelectTokenListLength({ setTokensLength }: { setTokensLength: any }) {
  return (
    <div>
      <FormControl
        sx={{
          m: 2,
          width: 300,
        }}
      >
        <InputLabel id="demo-multiple-name-label">Select Stratergy</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={"Select"} label="Number of tokens" onChange={(e) => setTokensLength(e.target.value)}>
          {tokensLength.map((num: number) => {
            return <MenuItem value={num}>{num}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
