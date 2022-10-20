import { TextField } from "@mui/material";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";


const CreateSocial: NextPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tokens, setTokens] = useState(['', '', '']);
    const [numberOfTokens, setNumberOfTokens] = useState(1);
    const [tokenInputComponents, setTokenInputComponents] = useState(<></>);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Create Social</h1>
                    <div className={styles.textField}>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            placeholder="Name"
                        />
                    </div>
                    <div className={styles.textField}>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            placeholder="Description"
                        />
                    </div>
                    {tokens.map((token, index) => {
                        return (
                            <div className={styles.textField}>
                                <TextField
                                    id="outlined-basic"
                                    variant="standard"
                                    onChange={(e) => {
                                        setTokens((prevTokens) => {
                                            prevTokens[index] = e.target.value;
                                            return prevTokens;
                                        }
                                        )
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    placeholder="Token"
                                />
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    );
};

export default CreateSocial;


