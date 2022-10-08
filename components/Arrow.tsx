import React from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styles from "../styles/Home.module.css";

export function Arrow({ }) {
    return <div className={styles.downArrow}>
        <ArrowDownwardIcon />
    </div>;
}
