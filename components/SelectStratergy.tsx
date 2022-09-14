import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { statergys } from "../globals";

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
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={stratergy} label="Strategies" onChange={(e) => setStratergy(e.target.value)}>
          {statergys.map((strat: string, i: number) => {
            return <MenuItem key={i} value={strat}>{strat}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
