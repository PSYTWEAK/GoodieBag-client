import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export function DexCheckList({ config, setConfig }: { config: any; setConfig: any }) {
  return (
    <div>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked={config.uniswap} onClick={() => setConfig({ ...config, uniswap: !config.uniswap })} />} label="Uniswap" />
        <FormControlLabel control={<Checkbox defaultChecked={config.sushiswap} onClick={() => setConfig({ ...config, sushiswap: !config.sushiswap })} />} label="Sushiswap" />
      </FormGroup>
    </div>
  );
}
