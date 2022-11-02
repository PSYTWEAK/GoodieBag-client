import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SocialABI from "../contracts/SocialABI.json";
import { arbiSocialAddress } from "../globals";
import { useContractWrite } from "wagmi";

let inputStyles = {
    'input': {
        width: "400px",
        color: 'white',
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: 'white'
        }
    }
}


const CreateSocialStratergy: NextPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tokens, setTokens] = useState(['', '', '']);
    const [fee, setFee] = useState(0);

    const { data, isLoading, isSuccess, write } = useContractWrite({
        addressOrName: arbiSocialAddress,
        contractInterface: SocialABI,
        functionName: "createStratergy",
    });

    const handleClick = async () => {
        if (name && description && tokens && fee) {
            write({
                args: [tokens, name, description, fee],
                overrides: {
                    value: 0,
                    gasLimit: "60000000",
                },
            });
        }


    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitleText}>Create Stratergy</h2>
                    <div className={styles.textField}>
                        <p>Name</p>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            sx={inputStyles}
                            className={styles.ETHinput}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            onChange={(e: any) => {
                                setName(e.target.value);
                            }}
                            placeholder="Name"
                        />
                    </div>
                    <div className={styles.textField}>
                        <p>Description</p>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            sx={inputStyles}
                            className={styles.ETHinput}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            onChange={(e: any) => {
                                setDescription(e.target.value);
                            }}
                            placeholder="Description"
                        />
                    </div>
                    <div className={styles.textField}>
                        <p>Fee</p>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            sx={inputStyles}
                            className={styles.ETHinput}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            onChange={(e: any) => {
                                setFee(e.target.value);
                            }}
                            placeholder="%"
                        />
                    </div>

                    <div className={styles.textField}>
                        <p>Token #1</p>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            className={styles.ETHinput}
                            sx={inputStyles}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            placeholder="0x.."
                            onChange={(e: any) => {
                                setTokens([e.target.value, tokens[1], tokens[2]]);

                            }
                            }
                        />
                    </div>

                    <div className={styles.textField}>
                        <p>Token #2</p>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            className={styles.ETHinput}
                            sx={inputStyles}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            placeholder="0x.."
                            onChange={(e: any) => {
                                setTokens([tokens[0], e.target.value, tokens[2]]);
                            }}
                        />
                    </div>

                    <div className={styles.textField}>
                        <p>Token #3</p>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            className={styles.ETHinput}
                            sx={inputStyles}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            placeholder="0x.."
                            onChange={(e: any) => {
                                setTokens([tokens[0], tokens[1], e.target.value]);
                            }}
                        />
                    </div>


                    <Button className={styles.plusButton} onClick={handleClick} >
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

export default CreateSocialStratergy;


