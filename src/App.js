import React from 'react'
import Header from "./components/header";
import SideBar from "./components/side-bar";
import ResourceScreen from "./screens/resource-screen";
import SpecificationScreen from "./screens/specification-screen";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';


function App() {
  return (
      <Router>
          <div className="App">
              <SideBar/>
              <Header/>
              <Switch>
                  <Route path={'/'} exact component={SpecificationScreen}/>
                  <Route path={'/resources'}  component={ResourceScreen}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
