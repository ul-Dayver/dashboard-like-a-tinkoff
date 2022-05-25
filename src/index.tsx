import "./app.d";
import "normalize.css"
import './styles/index.scss'
import React from 'react'
import ReactDOM from "react-dom"
import Dashboard from './dashboard'
import ProfileBar from "./components/ProfileBar";
import {WidgetCouterparty, WidgetOrders } from "./widgets"
import Demo from "./dashboard/demo";
document.body.onselectstart = () => false

Demo([WidgetOrders, WidgetCouterparty]).then(() => {
  const App = () => {
    return (
      <>
        <ProfileBar />
        <Dashboard>
          <WidgetCouterparty />
          <WidgetOrders />
        </Dashboard>
        <footer></footer>
      </>
    )
  };
  ReactDOM.render(<App />, document.getElementById("root"));  
})