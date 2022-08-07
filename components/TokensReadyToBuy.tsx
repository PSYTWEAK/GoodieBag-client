import * as React from "react";
import Grid from "@mui/material/Grid";
import styles from "../styles/Home.module.css";
import { CircularProgress } from "@mui/material";
import { DeleteTokenButton } from "./DeleteTokenButton";

export default function TokensReadyToBuy({ pools, loading, setPools }: { pools: any; loading: any; setPools: any }) {
  const handleRemoveToken = (token: string) => {
    setPools(pools.filter((item: any) => item.pool.token1.id !== token));
  };
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} direction="column" marginTop={1.5}>
      {loading === "false" ? <></> : loading === "null" ? <h1>No Tokens Found</h1> : loading === "true" && !pools ? <LoadingProcess /> : <>{TokenList(pools, handleRemoveToken)}</>}
    </Grid>
  );
}

const TokenList = (pools: any, handleRemoveToken: any) => {
  return pools.map((data: any, i: number) => {
    try {
      return (
        <Grid item xs={8} width="max">
          <div className={styles.div}>
            <p>{data.pool.token1.name}</p>
            <p>&nbsp;</p>
            <p>{data.pool.token1.symbol}</p>
            <DeleteTokenButton removeToken={() => handleRemoveToken(data.pool.token1.id)} />
          </div>{" "}
          <div className={styles.smolSignificantData}>
            {" "}
            <p>{data.pool.significantData}</p>{" "}
          </div>
        </Grid>
      );
    } catch (err) {
      console.log("Couldn't show token " + i + err);
      return <></>;
    }
  });
};

function LoadingProcess({}) {
  return (
    <div className={styles.div}>
      <CircularProgress />
    </div>
  );
}
