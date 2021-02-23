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
import {logoutUser} from "./actions/auth-actions";
import {connect} from "react-redux";
import MainScreen from "./screens/main-screen";


function App({accessToken}) {

    const [active, setActive] = useState(false)
    const [orderBtnActive, setOrderBtnActive] = useState(false)
    const [resourcesBtnActive, setResourcesBtnActive] = useState(false)

    return (
        <Router>
            <div className="App">
                {accessToken ? (<SideBar setActive={setActive} setOrderBtn={setOrderBtnActive}
                                         setResourcesActive={setResourcesBtnActive} />) : null}
                {accessToken ? (
                    <Header active={active} orderBtn={orderBtnActive} resourcesBtn={resourcesBtnActive}/>) : null}

                <Switch>
                    <Route exact path={'/'} component={MainScreen}/>
                    <Route path={'/specification'} component={SpecificationScreen}/>
                    <Route path={'/resources'} component={ResourceScreen}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path={'/orders'} component={OrderScreen}/>
                    <Route path={"/order/:order_id"} component={OrderDetail}/>
                </Switch>
            </div>
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
