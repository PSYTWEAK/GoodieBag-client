import { TokenMoreData } from './TokenMoreData';
import { TokenName } from './TokenName';

import { CalldataBuildFeedback } from './CalldataBuildFeedback';
import * as React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Home.module.css";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { DeleteTokenButton } from "./DeleteTokenButton";
import { TokenLogo } from "./TokenLogo";
import { StratergySpecificData } from './StratergySpecificData';
import { TokenPrice } from './TokenPrice';

export default function Tokens({ state, loading, setState }: { state: any; loading: any; setState: any; }) {

  const [tokenIdHovered, setTokenIdHovered] = React.useState("");

  const handleRemoveToken = (token: string) => {
    const newTokens = state.tokens.filter((t: any) => t.id !== token);
    setState((prevState: any) => { return { ...prevState, tokens: newTokens } });
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} direction="column" marginTop={1.5}>
      {loading === "false" ? <></> :
        loading === "null" ? <h1>No Tokens Found</h1> :
          loading === "true" ? loadingAllTokensProgress() :
            loading === "done" && state.tokens && state.tokens.length > 0 ? <>{TokenList(state.tokens, handleRemoveToken, state.amountETHIn, tokenIdHovered, setTokenIdHovered)}</> :
              <></>}
    </Grid>
  );
}

const TokenList = (tokens: any, handleRemoveToken: any, amountETHIn: any, tokenIdHovered: any, setTokenIdHovered: any) => {
  return (
    <>
      {tokens.map((token: any, i: number) => {
        return (
          <Grid key={token.id} item xs={8} width="max">
            <div className={styles.tokenCard} onMouseEnter={() => setTokenIdHovered(token.id)} onMouseLeave={() => setTokenIdHovered("")}>
              <div className={styles.upperTokenCard}>
                <TokenLogo token={token} />
                <TokenName token={token} />
                <DeleteTokenButton token={token} removeToken={() => handleRemoveToken(token.id)} />
                <CalldataBuildFeedback token={token} />
              </div>{" "}
              <TokenMoreData token={token} tokenIdHovered={tokenIdHovered} />
              <div className={styles.lowerTokenCard}>
                <TokenPrice token={token} numberOfTokens={tokens.length} amountETHIn={amountETHIn} />
              </div>{" "}
            </div>{" "}
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


