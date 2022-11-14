import "./App.css";
import React from "react";
import Routes from "./services/Routes/Routes.js"
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer.js"
import { withRouter } from "react-router";
import {getToken} from './services/api'


function App() {
  const token = getToken()
  return (
    <div id="App">
      <NavigationBar token={token}/>
      <Routes/>
      <Footer/>
    </div>
  );
}

export default withRouter(App);
