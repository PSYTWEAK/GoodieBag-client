// a component which takes in a list of token objects, checks if one matches the token address, and returns the .logoUri property of that token object
// if no token matches, it returns the default token logo https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png

import { useState, useEffect } from "react";
import useOneInchTokenList from "../hooks/useOneInchTokenList";

export function TokenLogo({ tokenAddress }: { tokenAddress: string }) {

    const oneInchTokenList = useOneInchTokenList();

    const [logo, setLogo] = useState("https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png");

    useEffect(() => {
        // check if tokenAddress is found in tokenlist
        const token: any = oneInchTokenList.find((token: any) => token.address === tokenAddress);
        if (token) {
            setLogo(token.logoURI);
        }
    }, [oneInchTokenList]);

    return (
        <img src={logo} height={30} />
    );
}
