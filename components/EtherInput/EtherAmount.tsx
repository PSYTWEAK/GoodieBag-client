import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

const EtherAmount = () => {
  const [value, setValue] = useState();
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      placeholder="0.00"
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
    />
  );
};
export default EtherAmount;
