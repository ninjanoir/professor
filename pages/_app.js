import "semantic-ui-css/semantic.min.css";
import '../scss/styles.scss';
import Layout from "./../components/layout";
import 'notyf/notyf.min.css';


export default function App({ Component, pageProps }) {
    return (
        <Layout>
        <Component {...pageProps} />
        </Layout>
    );
}
