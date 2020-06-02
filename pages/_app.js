import "semantic-ui-css/semantic.min.css";
import '../scss/styles.scss';
import Layout from "./../components/layout";


export default function App({ Component, pageProps }) {
    return (
        <Layout>
        <Component {...pageProps} />
        </Layout>
    );
}
