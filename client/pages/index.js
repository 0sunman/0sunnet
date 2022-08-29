import AppLayout from "../component/AppLayout.js"
import Head from "next/head";

const Home = () => {
    return (<>
    <Head>
        <title>Main | React</title>
        <meta charSet="utf-8"/>
    </Head>
        <AppLayout>Hello, React!</AppLayout>
    </>)
}
export default Home;