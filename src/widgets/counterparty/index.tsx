import React from "react";
//import { observer } from 'mobx-react'
//import myStore from "../../../store"
import { createWidget } from "../../dashboard/widgets";

function Counterparty (){
  return (<div></div>)
}

export default createWidget("Контрагенты", {}, Counterparty)