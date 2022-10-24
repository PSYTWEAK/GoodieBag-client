import { SocialStratergies } from './../components/social/SocialStratergies';

import type { NextPage } from "next";
import { TokenLogo } from "../components/Tokens/TokenLogo";
import styles from "../styles/Home.module.css";
import DefaultTokenLogo from "../public/DefaultTokenLogo.png";
import { TextField } from '@mui/material';

const Social: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.socialSearch}>
                    <div className={styles.textField}>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            placeholder="Search.."
                        />
                    </div>
                </div>{" "}
                <SocialStratergies />
            </main>


        </div>
    );
};

export default Social;


