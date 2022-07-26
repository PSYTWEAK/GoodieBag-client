import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
const Statergys = ["Randomly selected tokens with minimum $100 volume", "Randomly selected tokens with 0 volume", "Randomly selected tokens all", "Tokens added today"];

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
        <Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={Statergys} onChange={(event) => setStratergy(event.target.value)}>
          {Statergys.map((_Statergy) => (
            <MenuItem key={_Statergy} value={_Statergy}>
              {_Statergy}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
