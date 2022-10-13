// a navbar which is used to switch between the index page and the leaderboard page


import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { FaTwitter, FaDiscord } from 'react-icons/fa'


export function Footer() {
    return (
        <nav className={styles.footer}>
            <div className={styles.footerLinks}>
                <a href='https://twitter.com/TheDeadCuties'>
                    <FaTwitter style={{ height: 25, width: 25, color: "grey" }} />
                </a>
                <a href='https://discord.gg/3ZTdrzHv'>
                    <FaDiscord style={{ height: 30, width: 30, color: "grey" }} />
                </a>

            </div>
        </nav>
    );
}
