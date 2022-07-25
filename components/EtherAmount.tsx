import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

const BuyInput = ({ value, setValue }) => {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      placeholder="0.00"
      fullWidth
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
export default BuyInput;
