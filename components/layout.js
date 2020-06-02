import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";




const Layout = ({ children }) => (
    <>
        <Head>
        <title>Votre Coach Perso</title>
        </Head>

        <header>
        <Navbar />
        </header>
        <main>{children}</main>

        <Footer />

    </>
);

export default Layout;
