import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

let inputStyles = {
    width: "4000px",
    'input': {
        color: 'white',
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: 'white'
        }
    }
}


const CreateSocial: NextPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tokens, setTokens] = useState(['', '', '']);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitleText}>Create Stratergy</h2>
                    <div className={styles.textField}>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            sx={inputStyles}
                            className={styles.ETHinput}
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
                            sx={inputStyles}
                            className={styles.ETHinput}
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
                                    className={styles.ETHinput}
                                    sx={inputStyles}
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
                                    placeholder="Token Address"
                                />
                            </div>
                        )
                    })}

                    <Button className={styles.plusButton} >
                        <AddIcon />
                    </Button>

                    <Button className={styles.buyButton} >
                        Create Stratergy
                    </Button>


                </div>
            </main>
        </div>
    );
};

export default CreateSocial;


