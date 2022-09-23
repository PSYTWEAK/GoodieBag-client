// a component for showing the price of a token in Tokens.tsx

import { useState, useEffect } from "react";
import { useContractRead, useProvider } from "wagmi";
import useTokenPrice from "../../hooks/tokenPrice/useTokenPrice";

export function TokenPrice({ token }: { token: any }) {
    const provider = useProvider();

    const { tokenPrice, getTokenPrice } = useTokenPrice();

    useEffect(() => {
        getTokenPrice(provider, token);

    }, [token]);

    return (<>
        <p>Price: </p>
        <p>{tokenPrice}</p></>
    );
}