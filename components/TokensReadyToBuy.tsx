import * as React from "react";
import Grid from "@mui/material/Grid";
import styles from "../styles/Home.module.css";

export default function TokensReadyToBuy({ tokens, loading }: { tokens: any; loading: any }) {
  React.useEffect(() => {
    console.log(tokens);
  }, [tokens]);
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {loading === "false" ? (
        <></>
      ) : loading === "null" ? (
        <h1>No Tokens Found</h1>
      ) : loading === "true" && !tokens ? (
        <h1>Loading</h1>
      ) : (
        tokens.map((_token: any, i: number) => {
          try {
            return (
              <Grid item xs={8} width="max">
                <p>{_token.pool.token0.name}</p>
                <p>{_token.pool.token0.symbol}</p>
              </Grid>
            );
          } catch (err) {
            console.log("Couldn't show token " + i + err);
          }
        })
      )}
    </Grid>
  );
}
