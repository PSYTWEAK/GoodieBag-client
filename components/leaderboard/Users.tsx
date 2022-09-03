import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Home.module.css";
import { CircularProgress } from "@mui/material";
import { ethers, BigNumber } from "ethers";

export function Users({ users, loading }: { users: any; loading: any; }) {
  console.log(users);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} direction="column" marginTop={1.5}>
      {loading === "false" ? <></> : loading === "null" ? <h1>No Users Found</h1> : loading === "true" ? <LoadingProcess /> : <>{UserList(users)}</>}
    </Grid>
  );
}

const UserList = (users: any) => {
  return (
    <>
      {users.map((data: any, i: number) => {
        try {
          return (
            <Grid item xs={8} width="max">
              <div className={styles.div}>
                <p>#{i + 1}</p>
                <p>&nbsp;</p>
                <a href={`https://arbiscan.io/address/${data.id}`}>
                  <p>{readableAddress(data)}</p>
                </a>
                <p>&nbsp;</p>
                <p>{readableEthAmount(data)}</p>
                <p>&nbsp;</p>
                <p> ETH</p>
              </div>{" "}
            </Grid>
          );
        } catch (err) {
          return <></>;
        }
      })}
    </>
  );
};

function readableAddress(data: any): React.ReactNode {
  return `${data.id.slice(0, 5)}...${data.id.substr(data.id.length - 4)}`;
}

function readableEthAmount(data: any) {
  const value = BigNumber.from(data.value);
  const ETHAmount = ethers.utils.formatEther(value);
  const roundedEthAmount = ETHAmount.slice(0, 9);

  return roundedEthAmount;
}

function LoadingProcess({ }) {
  return (
    <div className={styles.div}>
      <CircularProgress />
    </div>
  );
}
