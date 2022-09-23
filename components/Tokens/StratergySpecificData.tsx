import * as React from "react";
import styles from "../../styles/Home.module.css";

export function StratergySpecificData(data: any) {
    if (data) {
        return (
            <div className={styles.smolstratergySpecificData}>
                <p>{data.stratergySpecificData}</p>
            </div>
        );
    } else {
        return <></>;
    }
}
