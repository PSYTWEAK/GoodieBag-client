import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { statergys } from "../globals";

export function SelectStratergy({ setStratergy }: { setStratergy: any }) {
  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: 300,
        }}
      >
        <InputLabel id="demo-multiple-name-label">Statergy</InputLabel>
        <Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={statergys} onChange={(event) => setStratergy(event.target.value)}>
          {statergys.map((_Statergy) => (
            <MenuItem key={_Statergy} value={_Statergy}>
              {_Statergy}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
