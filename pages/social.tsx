
import type { NextPage } from "next";
import { TokenLogo } from "../components/Tokens/TokenLogo";
import styles from "../styles/Home.module.css";
import DefaultTokenLogo from "../../public/DefaultTokenLogo.png";

const Social: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.socialGrid}>
                    <div className={styles.socialCard}>
                        <p>DogCoins</p>
                        <p>by 0x7347..548485</p>
                        <p>tokens</p>
                        <img src={DefaultTokenLogo.src} height={30} />
                        <TokenLogo token={{ id: "null" }}></TokenLogo>
                        <TokenLogo token={{ id: "null" }}></TokenLogo>
                        <TokenLogo token={{ id: "null" }}></TokenLogo>
                        <TokenLogo token={{ id: "null" }}></TokenLogo>
                    </div>
                    <div className={styles.socialCard}></div>
                    <div className={styles.socialCard}></div>
                    <div className={styles.socialCard}></div>
                    <div className={styles.socialCard}></div>
                    <div className={styles.socialCard}></div>

                </div>

            </main>


        </div>
    );
};

export default Social;


