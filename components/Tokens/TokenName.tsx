import React from "react";


export function TokenName({ token }: { token: any }) {


    return (<>
        <a target="_blank" rel="noreferrer" href={`https://arbiscan.io/address/${token.id}`}>
            <p>{token.name}</p>
        </a>;
        <p>&nbsp;</p>
        <p>{token.symbol}</p>
    </>);
}