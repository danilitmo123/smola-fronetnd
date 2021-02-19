import React, {useState} from 'react'
import Header from "./components/header";
import SideBar from "./components/side-bar";
import ResourceScreen from "./screens/resource-screen";
import SpecificationScreen from "./screens/specification-screen";
import OrderScreen from "./screens/order-screen";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';


function App() {

  const [active, setActive] = useState(true)
  const [orderBtnActive, setOrderBtnActive] = useState(false)
  const [resourcesBtnActive, setResourcesBtnActive] = useState(false)

  return (
      <Router>
          <div className="App">
              <SideBar setActive={setActive} setOrderBtn={setOrderBtnActive} setResourcesActive={setResourcesBtnActive}/>
              <Header active={active} orderBtn={orderBtnActive} resourcesBtn={resourcesBtnActive}/>
              <Switch>
                  <Route exact path={'/'} component={SpecificationScreen}/>
                  <Route path={'/resources'}  component={ResourceScreen}/>
                  <Route path={'/orders'} component={OrderScreen}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
