import * as React from "react";
import Grid from "@mui/material/Grid";
import styles from "../styles/Home.module.css";
import { CircularProgress } from "@mui/material";
import { DeleteTokenButton } from "./DeleteTokenButton";
import useOneInchTokenList from "../hooks/useOneInchTokenList";
import { TokenLogo } from "./TokenLogo";
import { Token } from "graphql";
import DoneIcon from '@mui/icons-material/Done';
import { Done } from "@mui/icons-material";
import ErrorIcon from '@mui/icons-material/Error';

export default function Tokens({ tokens, loading, setTokens, generatingCalldata }: { tokens: any; loading: any; setTokens: any, generatingCalldata: string }) {

  const handleRemoveToken = (token: string) => {
    setTokens(tokens.filter((item: any) => item.id !== token));
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} direction="column" marginTop={1.5}>
      {loading === "false" ? <></> :
        loading === "null" ? <h1>No Tokens Found</h1> :
          loading === "true" ? <LoadingProcess /> :
            loading === "done" && tokens.length > 0 ? <>{TokenList(tokens, handleRemoveToken, generatingCalldata)}</> :
              <></>}
    </Grid>
  );
}

const TokenList = (tokens: any, handleRemoveToken: any, generatingCalldata: string) => {
  return (
    <>
      {stratergySpecificData(tokens[0].stratergySpecificDataDes)}
      {tokens.map((data: any, i: number) => {
        try {
          return (
            <Grid item xs={8} width="max">
              <div className={styles.div}>
                <TokenLogo tokenAddress={data.id} />
                <a target="_blank" href={`https://arbiscan.io/address/${data.id}`}>
                  <p>{data.name}</p>
                </a>
                <p>&nbsp;</p>
                <p>{data.symbol}</p>
                {data.hasCalldata === "null" ? <DeleteTokenButton removeToken={() => handleRemoveToken(data.id)} /> : <></>}
                {tokenBuildFeedback(data)}
              </div>{" "}
              {stratergySpecificData(data.stratergySpecificData)}
            </Grid>
          );
        } catch (err) {
          return error(i, err);
        }
      })}
    </>
  );
};

function tokenBuildFeedback(token: any) {
  if (token.hasCalldata === "loading") {
    return (
      <div className={styles.tokenBuildFeedback}>
        <CircularProgress />
      </div>
    );
  } else if (token.hasCalldata === "true") {
    return (
      <div className={styles.tokenBuildFeedback}>
        <DoneIcon />
      </div>

    );
  } else if (token.hasCalldata === "false") {
    return (
      <div className={styles.tokenBuildFeedback}>
        <ErrorIcon />
      </div>
    );
  } else {
    return <></>;
  }
}

function error(i: number, err: any) {
  console.log("Couldn't show token " + i + err);
  return <></>;
}

function LoadingProcess() {
  return (
    <div className={styles.div}>
      <CircularProgress />
    </div>
  );
}

function stratergySpecificData(data: string) {
  if (data) {
    return (
      <div className={styles.smolstratergySpecificData}>
        <p>{data}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
