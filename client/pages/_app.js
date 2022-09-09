import PropTypes from 'prop-types';
import 'antd/dist/antd.css'
import "tailwindcss/tailwind.css";
import wrapper from '../store/configureStore';


const App = ({Component,pageProps})=>{
    return (
        <Component {...pageProps}/>
    )
}

App.propTypes = {
    Component:PropTypes.elementType.isRequired,
    pageProps:PropTypes.any
}


export default wrapper.withRedux(App);