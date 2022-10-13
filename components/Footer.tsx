// a navbar which is used to switch between the index page and the leaderboard page


import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from "next/head";
import TwitterIcon from '@mui/icons-material/Twitter';
import { SocialIcon } from 'react-social-icons';


export function Footer() {
    return (
        <nav className={styles.footer}>
            <div className={styles.footerLinks}>
                <SocialIcon url="https://twitter.com/TheDeadCuties" bgColor='transparent' fgColor='grey' style={{ height: 35, width: 35 }} />
                <SocialIcon url="https://discord.gg/3ZTdrzHv" bgColor='rgb(240, 251, 255)' fgColor='grey' style={{ height: 35, width: 35 }} />
            </div>
        </nav>
    );
}