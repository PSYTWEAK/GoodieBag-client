import React from "react";
import { TokenLogo } from "./TokenLogo";
import { TokenName } from "./TokenName";


export function TokenContractData({ token }: { token: any }) {


    return (<>
        <TokenName token={token} />
        <p>&nbsp;</p>
        <p>{token.symbol}</p></>);
}