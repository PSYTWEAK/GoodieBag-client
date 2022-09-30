// a component for showing the price of a token in Tokens.tsx

import { useState, useEffect } from "react";
import { useContractRead, useProvider } from "wagmi";
import useTokenPrice from "../../hooks/tokenPrice/useTokenPrice";
import { BigNumber, ethers } from "ethers";

export function TokenPrice({ token, numberOfTokens, amountETHIn }: { token: any; numberOfTokens: number; amountETHIn: any }) {
    const provider = useProvider();

    const [amountInThisToken, setAmountInThisToken] = useState(0);
    const [amountOutThisToken, setAmountOutThisToken] = useState("0");
    // use ethers to format units of token

    useEffect(() => {
        if (token.buyAmount) {
            let formattedAmountInThisToken = ethers.utils.formatUnits(token.buyAmount, token.decimals);
            setAmountOutThisToken(formattedAmountInThisToken);
        } else if (token.hasCalldata === "true") {

            setAmountOutThisToken("?");
        }

    }, [token.buyAmount]);

    useEffect(() => {
        setAmountInThisToken(amountETHIn / numberOfTokens);

    }, [numberOfTokens, amountETHIn]);

    return (<>
        <div>
            <p>In:</p>
            <p>&nbsp;</p>
            <p>{amountInThisToken}</p>
            <p>&nbsp;</p>
            <p>ETH</p></div>
        <br />
        <div>
            <p>Out: </p>
            <p>&nbsp;</p>
            <p>{amountOutThisToken} </p>
            <p>&nbsp;</p>
            <p>{token.symbol} </p>
        </div>
    </>);
}