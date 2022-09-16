// a component which takes in a list of token objects, checks if one matches the token address, and returns the .logoUri property of that token object
// if no token matches, it returns the default token logo DefaultTokenLogo

import { useState, useEffect } from "react";
import useOneInchTokenList from "../hooks/useOneInchTokenList";
import DefaultTokenLogo from "../public/DefaultTokenLogo.png";
import styles from "../styles/Home.module.css";


export function TokenLogo({ tokenAddress }: { tokenAddress: string }) {

    const [oneInchTokenList, loading] = useOneInchTokenList();

    // set the logo to the default token logo
    const [logo, setLogo] = useState(DefaultTokenLogo.src);


    useEffect(() => {
        // check if tokenAddress is found in tokenlist
        if (oneInchTokenList) {

            const token = oneInchTokenList[`${tokenAddress}`];
            if (token) {
                setLogo(token.logoURI);
            }
        }
    }, [oneInchTokenList, tokenAddress]);

    return (
        // div is needed to center the image
        <div className={styles.tokenLogo}>
            <img src={logo} height={30} />
        </div>
    );
}