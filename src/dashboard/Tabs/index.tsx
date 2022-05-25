import React from "react";
import "./style.scss"
import { TTab, TTabHandle } from "../Api/types"
import PlusIcon from '../../icon/Plus'
import TabItem from "./Item"
import ScrollableGroup from "./ScrollableGroup";


function Tabs({tabs, handleTab}: {tabs: TTab[], handleTab: TTabHandle}) {
  return (
    <div className="app-core-dashboard-tabs">
      <div className="app-core-dashboard-tabs-container">
        <div className="app-core-dashboard-tabs-panel">
          <ScrollableGroup>
            {tabs.map(tab => <TabItem {...tab} {...handleTab} key={tab.id}/>)}
          </ScrollableGroup>
        </div>
        <div className="app-core-dashboard-tabs-addbttn" onClick={handleTab.add}>
          <span className="app-icon"><PlusIcon /></span>
        </div>
      </div>
    </div>
  )
}

export default Tabs