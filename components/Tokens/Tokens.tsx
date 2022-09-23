import { TokenContractData } from './TokenContractData';

import { CalldataBuildFeedback } from './CalldataBuildFeedback';
import { TokenName } from './TokenName';
import * as React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Home.module.css";
import { CircularProgress } from "@mui/material";
import { DeleteTokenButton } from "./DeleteTokenButton";
import { TokenLogo } from "./TokenLogo";
import { StratergySpecificData } from './StratergySpecificData';
import { TokenPrice } from './TokenPrice';

export default function Tokens({ tokens, loading, setTokens }: { tokens: any; loading: any; setTokens: any }) {

  const handleRemoveToken = (token: string) => {
    setTokens(tokens.filter((item: any) => item.id !== token));
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} direction="column" marginTop={1.5}>
      {loading === "false" ? <></> :
        loading === "null" ? <h1>No Tokens Found</h1> :
          loading === "true" ? loadingAllTokensProgress() :
            loading === "done" && tokens.length > 0 ? <>{TokenList(tokens, handleRemoveToken)}</> :
              <></>}
    </Grid>
  );
}

const TokenList = (tokens: any, handleRemoveToken: any) => {
  const titleOfStratSpecificData = <div className={styles.smolstratergySpecificData}>
    <p>{tokens[0].stratergySpecificDataDes}</p>
  </div>;
  return (
    <>
      {titleOfStratSpecificData}
      {tokens.map((token: any, i: number) => {
        return (
          <Grid item xs={8} width="max">
            <div className={styles.div}>
              <TokenContractData token={token} />
              <DeleteTokenButton token={token} removeToken={() => handleRemoveToken(token.id)} />
              <CalldataBuildFeedback token={token} />
            </div>{" "}
            <div className={styles.lowerTokenCard}>
              <TokenPrice token={token} />
            </div>{" "}
            <StratergySpecificData token={token} />
          </Grid>
        );
      })}
    </>
  );
};


function loadingAllTokensProgress() {
  return (
    <div className={styles.div}>
      <CircularProgress />
    </div>
  );
}


