import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
export function TokenMoreData({ token, tokenIdHovered }: { token: any; tokenIdHovered: any; }) {

    const [result, setResult] = useState(<></>);

    useEffect(() => {

        if (tokenIdHovered === token.id) {
            setResult(<div className={styles.tokenMoreData}>
                <p>Volume USD: ${parseFloat(token.volumeUSD).toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
            </div>);

        } else {
            setResult(<></>);
        }

    }, [tokenIdHovered]);
    return result;
}
