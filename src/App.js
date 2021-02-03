import React from 'react'
import Header from "./components/header";
import SideBar from "./components/side-bar";
import HomeScreen from "./screens/home-screen";

import './App.css';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <Header/>
      <HomeScreen/>
    </div>
  );
}

export default App;
