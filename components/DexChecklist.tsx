import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export function DexCheckList() {
  return (
    <div>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Uniswap" />
        <FormControlLabel control={<Checkbox />} label="Sushiswap" />
      </FormGroup>
    </div>
  );
}
