import React, {useEffect} from 'react'

import {BrowserRouter as Router, useHistory} from "react-router-dom";
import './App.css';
import * as PropTypes from "prop-types";
import {connect, useDispatch, useSelector} from "react-redux";
import {DEFAULT_PAGES} from "./constants/deafult-pages"
import Loader from "./components/spinner";
import * as pages from "./constants/deafult-pages"
import {authCheckAction} from "./actions/check-auth-actions"
import MainFrame from "./frames/mian-frame";
import DefaultFrame from "./frames/default-frame";

function App({accessToken}) {

    const dispatch = useDispatch()
    const checkAuth = useSelector(state => state.checkAuth)
    const {error, loading, data} = checkAuth
    const history = useHistory()
    useEffect(() => {
        dispatch(authCheckAction(window.location.pathname))
    }, [dispatch])

    if (!Boolean(accessToken) && !DEFAULT_PAGES.includes(window.location.pathname)) {
        history.push(pages.LOGIN_PAGE);
    }

    return (
        <Router>
            {Boolean(accessToken) && !DEFAULT_PAGES.includes(window.location.pathname) ? (loading ? <Loader/> :
                <MainFrame/>) : null}
            <DefaultFrame/>
        </Router>
    );
}

App.propTypes = {
    accessToken: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        accessToken: state.auth,
    };
}


export default connect(mapStateToProps)(App);