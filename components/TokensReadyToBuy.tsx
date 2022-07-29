import * as React from "react";
import Grid from "@mui/material/Grid";
import styles from "../styles/Home.module.css";

export default function TokensReadyToBuy({ tokens, loading }: { tokens: any; loading: any }) {
  React.useEffect(() => {
    console.log(tokens);
  }, [tokens]);
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} direction="column">
      {loading === "false" ? (
        <></>
      ) : loading === "null" ? (
        <h1>No Tokens Found</h1>
      ) : loading === "true" && !tokens ? (
        <h1>Loading</h1>
      ) : (
        tokens.map((_token: any, i: number) => {
          console.log(_token.pool.token1.name);
          try {
            return (
              <Grid item xs={8} width="max">
                <div className={styles.div}>
                  <p>{_token.pool.token1.name}</p>
                  <p>&nbsp;</p>
                  <p>{_token.pool.token1.symbol}</p>
                </div>
              </Grid>
            );
          } catch (err) {
            console.log("Couldn't show token " + i + err);
            return <></>;
          }
        })
      )}
    </Grid>
  );
}
