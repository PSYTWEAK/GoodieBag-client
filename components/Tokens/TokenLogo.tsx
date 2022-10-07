// a component which takes in a list of token objects, checks if one matches the token address, and returns the .logoUri property of that token object
// if no token matches, it returns the default token logo DefaultTokenLogo

import { useState, useEffect } from "react";
import useOneInchTokenList from "../../hooks/useOneInchTokenList";
import DefaultTokenLogo from "../../public/DefaultTokenLogo.png";
import styles from "../../styles/Home.module.css";


export function TokenLogo({ token }: { token: any; }) {

    const [oneInchTokenList, loading] = useOneInchTokenList();

    // set the logo to the default token logo
    const [logo, setLogo] = useState(DefaultTokenLogo.src);


    useEffect(() => {
        // check if tokenAddress is found in tokenlist
        if (oneInchTokenList) {
            const data = oneInchTokenList[`${token.id}`];
            if (data) {
                setLogo(data.logoURI);
            }
        }
    }, [oneInchTokenList, token]);


    return (
        // div is needed to center the image
        <div className={styles.tokenLogo}>
            <img src={logo} height={30} />
        </div>
    );
}