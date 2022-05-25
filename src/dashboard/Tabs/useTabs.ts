import React from "react";
import { TTab, TTabHandle } from "../Api/types"
import { createTab, fetchTabs, deleteTab, updateTab } from "../Api/tabs"

export default function useTabs () {
  const [tabs, dispatch] = React.useState([] as TTab[])
  const handleTab = React.useMemo<TTabHandle>(() => ({
    add: () => {
      createTab({title: "Вкладка", active: false})
      .then(tab => {
        dispatch(state => {
          state.push(tab)
          return [...state]
        })
        return tab.id
      })
      .then(handleTab.setActive)
    },
    close: (id: string) => {
      deleteTab(id)
      dispatch(state => {
        const index = state.findIndex(tab => tab.id === id)
        if (state[index].active && state.length > 1) {
          const next = index === state.length - 1 ? state.length - 2 : index + 1
          if (state[next]) {
            state[next] = {...state[next], active: true}
            updateTab(state[next])
          }
        }
        state.splice(index, 1)
        return [...state]
      })
    },
    setActive: (id: string) => {
      dispatch(state => state.map(tab => {
        const ret = {...tab, active: tab.id === id}
        updateTab(ret)
        return ret
      }))
    }
  }), [])

  React.useEffect(() => {
    fetchTabs().then(dispatch)
  }, [])

  return {
    tabs,
    handleTab
  }
}