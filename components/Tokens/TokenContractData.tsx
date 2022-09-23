import React from "react";
import { TokenLogo } from "./TokenLogo";
import { TokenName } from "./TokenName";

import { useState, useEffect } from "react";
import useOneInchTokenList from "../../hooks/useOneInchTokenList";
import DefaultTokenLogo from "../../public/DefaultTokenLogo.png";
import styles from "../../styles/Home.module.css";


export function TokenContractData({ token }: { token: any }) {


    return (<>
        <TokenLogo tokenAddress={token.id} />
        <TokenName token={token} />
        <p>&nbsp;</p>
        <p>{token.symbol}</p></>);
}