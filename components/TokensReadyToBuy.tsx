import * as React from "react";
import Grid from "@mui/material/Grid";

export default function TokensReadyToBuy(tokens: any) {
  const handleTable = (tokens: any) => {
    return tokens.map((_tokens: any, i: number) => {
      try {
        return (
          <Grid item xs={6}>
            <p>token</p>
          </Grid>
        );
      } catch (err) {
        console.log("Couldn't show token " + i + err);
      }
    });
  };
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {handleTable(tokens)}
    </Grid>
  );
}
