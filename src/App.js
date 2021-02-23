import React, {useEffect, useState} from 'react'

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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

    useEffect(() => {
        dispatch(authCheckAction(window.location.pathname))
    }, [dispatch])

    if (!Boolean(accessToken) && !DEFAULT_PAGES.includes(window.location.pathname)) {
        window.location.href = pages.LOGIN_PAGE;
    }

    let mainFrame = Boolean(accessToken) && !DEFAULT_PAGES.includes(window.location.pathname)


    console.log("App start render. " + new Date())

    return (
        <Router>
            {mainFrame ? (loading ? <Loader/> : <MainFrame/>) : null}
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
