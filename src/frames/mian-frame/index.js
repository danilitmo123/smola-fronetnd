import SideBar from "../../components/side-bar";
import Header from "../../components/header";
import {Route, Switch, useHistory} from "react-router-dom";
import SpecificationScreen from "../../screens/specification-screen";
import ResourceScreen from "../../screens/resource-screen";
import OrderScreen from "../../screens/order-screen";
import React from "react";
import ProfileScreen from "../../screens/profile-screen";
import MainScreen from "../../screens/main-screen";


const MainFrame = () => {

    const history = useHistory()

    return (
        <div className={'App'}>
            <SideBar/>
            <Header/>
            <Switch>
                <Route exact path={'/'} component={MainScreen}/>
                <Route path={'/profile'} component={ProfileScreen}/>
                <Route path={'/specification/'} component={SpecificationScreen}/>
                <Route path={'/resources/'} component={ResourceScreen}/>
                <Route path={'/orders/'} component={OrderScreen}/>
                <Route path={'/profile/'} component={ProfileScreen} />
            </Switch>
        </div>
    )
}
export default MainFrame;