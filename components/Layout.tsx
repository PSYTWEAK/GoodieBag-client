import { ReactNode } from "react";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { NavBar } from "./NavBar";
import Head from "next/head";
import { Footer } from "./Footer";

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children }: Props) => (
    <>
        <div>
            <Head>
                <title>GoodieBag</title>
                <meta name="description" content="The ERC20 mass buying tool" />
                <link rel="icon" href="/logo.ico" />
            </Head>
            <NavBar />
            {children}

        </div>
        <footer><Footer /></footer>
    </>
);

export default Layout;