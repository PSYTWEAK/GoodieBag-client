import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Crown from "../components/leaderboard/Crown";
import { Users } from "../components/leaderboard/Users";
import useLeaderboard from "../hooks/leaderboard/useLeaderboard";
import { useAccount } from "wagmi";

const LeaderBoard: NextPage = () => {
  const [users, loading] = useLeaderboard();
  const { address, isConnected } = useAccount()
  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <div className={styles.card}>
          <Users users={users} loading={loading} address={address} />
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default LeaderBoard;


