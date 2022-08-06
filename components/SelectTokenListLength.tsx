import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { statergys } from "../globals";

var poolLength = Array.from(Array(50).keys());

export function SelectTokenListLength({ setPoolsLength }: { setPoolsLength: any }) {
  return (
    <div>
      <FormControl
        sx={{
          m: 2,
          width: 300,
        }}
      >
        <InputLabel id="demo-multiple-name-label">Select Stratergy</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={"Select"} label="Number of tokens" onChange={(e) => setPoolsLength(e.target.value)}>
          {poolLength.map((num: number) => {
            return <MenuItem value={num}>{num}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
