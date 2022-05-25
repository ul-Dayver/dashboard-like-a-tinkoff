import React from "react"
import { Observer } from 'mobx-react'
import './style.scss'
import useArea from './useArea'
import Guides from "./Guides"
import WidgetLayout from "./WidgetLayout"
import BtnAddWidget from "./BtnAddWidget"

function Area ({tabId}:{tabId: string}) {
  const {state, widgets, areaElement, addWidget, LayoutHandlers } = useArea(tabId)
  
  return (
    <React.Fragment>
      <BtnAddWidget widgets={widgets} onSelect={addWidget} />
      <Observer>
        {
          () => (
            <div className="app-core-dashboard-area" ref={areaElement}>
              {
                state.guides
                ? <Guides guides={state.guides}/>
                : null
              }
              <div className="app-core-dashboard-area-space">
                <div className="app-core-dashboard-area-scroll">
                  { state.widgets.map(wgt => <WidgetLayout key={wgt.id} {...wgt} {...LayoutHandlers} />) }
                </div>
              </div>
            </div>
          )
        }
      </Observer>
    </React.Fragment>
  )
}

export default React.memo(Area)