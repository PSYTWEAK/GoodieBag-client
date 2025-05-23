import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Home.module.css";
import { CircularProgress } from "@mui/material";
import { ethers, BigNumber } from "ethers";
import Crown from "./Crown";

export function Users({ users, loading, address }: { users: any; loading: any; address: any }) {

  return (<>
    <h1 className={styles.crown}>
      <Crown />
    </h1>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} direction="column" marginTop={1.5}>

      {loading === "false" ? <></> : loading === "null" ? <h1>No Users Found</h1> : loading === "true" ? <LoadingProcess /> : <>{UserList(users, address)}</>}
    </Grid></>
  );
}

const UserList = (users: any, address: any) => {
  return (
    <>
      {users.map((data: any, i: number) => {
        try {
          return (
            <Grid item xs={8} width="max">
              <div className={styles.leaderboardUser}>
                <p>#{i + 1}</p>
                <p>&nbsp;</p>
                <a target="_blank" rel="noreferrer" href={`https://arbiscan.io/address/${data.id}`}>
                  {newFunction(data, address)}
                </a>
                <p>&nbsp;</p>

                <p>{readableEthAmount(data)}</p>
                <p>&nbsp;</p>
                <p> ETH</p>   </div>


            </Grid>
          );
        } catch (err) {
          return <></>;
        }
      })}
    </>
  );
};

function newFunction(data: any, address: any) {
  let style = address && data.id.toLowerCase() === address.toLowerCase() ? styles.rainbow : "";

  return <p className={style}>{readableAddress(data)}</p>;


}

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
