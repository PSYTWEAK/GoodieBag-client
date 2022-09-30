
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Alert, AlertTitle } from "@mui/material";

export function SlippageInput({ isSuccess, data }: { isSuccess: bool; data: any }) {

    const [alertComp, setAlertComp] = useState(<></>);

    useEffect(() => {
        if (data.hash) {

            setAlertComp(
                <Alert severity={isSuccess ? "success" : "error"}>
                    <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
                    <a href={`https://arbiscan.io/tx/${txHash}`} target="_blank" rel="noreferrer">
                        View on Etherscan
                    </a>
                </Alert>
            );
            // wait 10 seconds then set alertComp to <></>
            setTimeout(() => {
                setAlertComp(<></>);
            }, 10000);
        }

    }, [isSuccess, data]);



    return (
        <div className={styles.txResponse}>
            {alertComp}
        </div>
    );
}
