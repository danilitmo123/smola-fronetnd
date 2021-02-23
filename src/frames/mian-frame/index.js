import SideBar from "../../components/side-bar";
import Header from "../../components/header";
import {Route, Switch} from "react-router-dom";
import SpecificationScreen from "../../screens/specification-screen";
import ResourceScreen from "../../screens/resource-screen";
import OrderScreen from "../../screens/order-screen";
import {OrderDetail} from "../../components/order-detail-modal";
import React, {useState} from "react";


const MainFrame = () => {

    console.log("MAIN FRAME render " + new Date())
    return (
        <div className={'App'}>
            <SideBar/>
            <Header/>
            <Switch>
                <Route exact path={'/'} component={SpecificationScreen}/>
                <Route path={'/resources/'} component={ResourceScreen}/>
                <Route path={'/orders/'} component={OrderScreen}/>
                <Route path={"/order/:order_id/"} component={OrderDetail}/>
            </Switch>
        </div>
    )
}
export default MainFrame;