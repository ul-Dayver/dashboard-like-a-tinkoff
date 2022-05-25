import React from 'react'
import ReactDOM from "react-dom"
import { fetchTabs, createTab } from "./Api/tabs"
import { createWidget, defaultView } from "./Api/widgets"
import { Context, TWidgetSet } from './widgets'

async function Demo(widgets: React.MemoExoticComponent<React.ComponentType>[]) {
  
  let tabId = ""
  const value = {
    widgets: [],
    RegistrationWidget: ({name, config}: TWidgetSet) => {
      createWidget({name, tabId, view: {...defaultView, ...config} })
    }
  }
  
  fetchTabs().then(tabs => {
    if (!tabs.length) {
      createTab({title: "Вкладка", active: true}).then(tab => {
        tabId = tab.id
        const container = document.createElement("div")
        ReactDOM.render(
          <Context.Provider value={value}>
            {widgets.map((Widget, i) => <Widget key={i}/>)}
          </Context.Provider>, container
        );
        ReactDOM.unmountComponentAtNode(container)
      })
    }
  })

  return true
}

export default Demo