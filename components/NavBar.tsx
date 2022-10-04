// a navbar which is used to switch between the index page and the leaderboard page


import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from "next/head";
import Logo from './Logo';

export function NavBar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.navLinks}>
                <Logo />

                <Link href="/">
                    <a className={styles.link}>Home</a>
                </Link>
                <Link href="/leaderboard">
                    <a className={styles.link}>Leaderboard</a>
                </Link>
            </div>
            <ConnectButton />

        </nav>
    );
}