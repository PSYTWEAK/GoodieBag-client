
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Alert, AlertTitle } from "@mui/material";

export function TxResponse({ isSuccess, data }: { isSuccess: boolean; data: any }) {

    const [alertComp, setAlertComp] = useState(<></>);

    useEffect(() => {
        if (data && data.hash) {
            transactionExecuted(setAlertComp, isSuccess, data);
        }
        if (data && !data.hash) {
            transactionCancelled(setAlertComp, isSuccess, data);
        }

    }, [isSuccess, data]);



    return (
        <div className={styles.txResponse}>
            {alertComp}
        </div>
    );
}
function transactionExecuted(setAlertComp: React.Dispatch<React.SetStateAction<JSX.Element>>, isSuccess: boolean, data: any) {
    setAlertComp(
        <Alert severity={isSuccess ? "success" : "error"} style={{
            backgroundColor: "white",
        }}>
            <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
            <a href={`https://arbiscan.io/tx/${data.hash}`} target="_blank" rel="noreferrer">
                View on Etherscan
            </a>
        </Alert>
    );
    // wait 10 seconds then set alertComp to <></>
    setTimeout(() => {
        setAlertComp(<></>);
    }, 10000);
}

function transactionCancelled(setAlertComp: React.Dispatch<React.SetStateAction<JSX.Element>>, isSuccess: boolean, data: any) {
    setAlertComp(
        <Alert severity={"error"} style={{
            backgroundColor: "white",
        }}>
            <AlertTitle>{"Transaction Cancelled"}</AlertTitle>
        </Alert>
    );
    // wait 10 seconds then set alertComp to <></>
    setTimeout(() => {
        setAlertComp(<></>);
    }, 10000);
}
