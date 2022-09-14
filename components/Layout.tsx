import { ReactNode } from "react";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { NavBar } from "./NavBar";
import Head from "next/head";

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children }: Props) => (

    <div>
        <Head>
            <title>GoodieBag</title>
            <meta name="description" content="The ERC20 mass buying tool" />
            <link rel="icon" href="/logo.ico" />
        </Head>
        <NavBar />
        {children}
        <footer></footer>
    </div>


);

export default Layout;