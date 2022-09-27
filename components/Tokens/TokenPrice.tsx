// a component for showing the price of a token in Tokens.tsx

import { useState, useEffect } from "react";
import { useContractRead, useProvider } from "wagmi";
import useTokenPrice from "../../hooks/tokenPrice/useTokenPrice";

export function TokenPrice({ token, numberOfTokens, amountETHIn }: { token: any; numberOfTokens: number; amountETHIn: any }) {
    const provider = useProvider();

    const { tokenPrice, getTokenPrice } = useTokenPrice();

    const [amountInThisToken, setAmountInThisToken] = useState(0);
    const [amountOutThisToken, setAmountOutThisToken] = useState(0);

    useEffect(() => {
        getTokenPrice(provider, token);

    }, [token]);

    useEffect(() => {
        setAmountInThisToken(amountETHIn / numberOfTokens);

    }, [numberOfTokens, amountETHIn]);

    useEffect(() => {
        if (tokenPrice) {

            setAmountOutThisToken((1 / amountInThisToken) * tokenPrice);

        }

    }, [amountOutThisToken, tokenPrice]);

    return (<>
        <p>In:</p>
        <p>&nbsp;</p>
        <p>{amountInThisToken}</p>
        <p>&nbsp;</p>
        <p>ETH</p>
        {/*         <br />
        <p>Out: {amountOutThisToken} </p> */}
    </>);
}