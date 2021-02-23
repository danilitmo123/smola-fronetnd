import React, {useState} from 'react'
import Header from "./components/header";
import SideBar from "./components/side-bar";
import ResourceScreen from "./screens/resource-screen";
import SpecificationScreen from "./screens/specification-screen";
import OrderScreen from "./screens/order-screen";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {OrderDetail} from "./components/order-detail-modal"
import './App.css';
import LoginPage from "./screens/login-screen";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import MainScreen from "./screens/main-screen";
import axiosAPI from "./components/api/axiosApi";
import {DEFAULT_PAGES} from "./constants/deafult-pages"
import Loader from "./components/spinner";

function App({accessToken}) {

    const [active, setActive] = useState(false)
    const [orderBtnActive, setOrderBtnActive] = useState(false)
    const [resourcesBtnActive, setResourcesBtnActive] = useState(false)

    const [loading, setLoading] = useState(true)
    let correct = null

    console.log(window.location.pathname)
    console.log(DEFAULT_PAGES.includes(window.location.pathname))

    if (!Boolean(accessToken) && !DEFAULT_PAGES.includes(window.location.pathname)) {
        window.location.href = "/login/";
    }

    if (!DEFAULT_PAGES.includes(window.location.pathname)) {

        axiosAPI.get("authenticate/user/check/").then(response => {
            correct = response;
            setLoading(false);
        })
        console.log(correct)
    } else if (loading){
        setLoading(false)
    }

    let header_and_side_bar = Boolean(accessToken) && !DEFAULT_PAGES.includes(window.location.pathname)
    return (
        <Router>
            {!loading ? (
            <div className="App">
                {accessToken ? (<SideBar setActive={setActive} setOrderBtn={setOrderBtnActive}
                                         setResourcesActive={setResourcesBtnActive} />) : null}
                {accessToken ? (
                {header_and_side_bar ?
                      (<SideBar
                          setActive={setActive}
                          setOrderBtn={setOrderBtnActive}
                          setResourcesActive={setResourcesBtnActive}/>)
                      : null}
                {header_and_side_bar ? (
                    <Header active={active} orderBtn={orderBtnActive} resourcesBtn={resourcesBtnActive}/>) : null}
                <Switch>
                    <Route exact path={'/'} component={MainScreen}/>
                    <Route path={'/specification'} component={SpecificationScreen}/>
                    <Route path={'/resources'} component={ResourceScreen}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path={'/orders'} component={OrderScreen}/>
                    <Route path={"/order/:order_id"} component={OrderDetail}/>
                    <Route exact path={'/'} component={SpecificationScreen}/>
                    <Route path={'/resources/'} component={ResourceScreen}/>
                    <Route path="/login/" component={LoginPage}/>
                    <Route path={'/orders/'} component={OrderScreen}/>
                    <Route path={"/order/:order_id/"} component={OrderDetail}/>
                </Switch>
            </div>) : (<Loader/>)}
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
