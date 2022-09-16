

import * as React from "react";
import styles from "../styles/Home.module.css";
import { CircularProgress } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';

export function CalldataBuildFeedback(token: any) {
    if (token.hasCalldata === "loading") {
        return <div className={styles.tokenCalldataBuildFeedback}>
            <CircularProgress />
        </div>;
    } else if (token.hasCalldata === "true") {
        return <div className={styles.tokenCalldataBuildFeedback}>
            <DoneIcon />
        </div>;
    } else if (token.hasCalldata === "false") {
        return <div className={styles.tokenCalldataBuildFeedback}>
            <ErrorIcon />
        </div>;
    } else {
        return <></>;
    }
}
