import React, { createContext } from "react";
import { observer } from 'mobx-react'
import { TPartialWidgetView } from './Api/types'

export type TWidgetSet = {
  title: string,
  name: string,
  Component: () => JSX.Element,
  config: TPartialWidgetView
}

export type TProviderWidget = {
  widgets: TWidgetSet[],
  RegistrationWidget: (widget: TWidgetSet) => void
}

export const Context = createContext<TProviderWidget>({
  widgets: [],
  RegistrationWidget: (widget: TWidgetSet) => { widget; }
})

export function createWidget(
  title: string,
  config: TPartialWidgetView,
  Component: () => JSX.Element,
) {

  function WidgetRegistrationComponent() {
    const { RegistrationWidget } = React.useContext(Context)
    React.useEffect(() => {
      RegistrationWidget({title, name: Component.name, config, Component: observer(Component)})
    }, [RegistrationWidget])

    return null
  }

  return React.memo(WidgetRegistrationComponent)
}

export function useProvider() : TProviderWidget {
  const [state, dispatch] = React.useState([] as TWidgetSet[])

  return {
    widgets: state,
    RegistrationWidget: React.useCallback((widget: TWidgetSet) => {
      dispatch(state => {
        const index = state.findIndex(({name}) => widget.name.toLocaleLowerCase() === name.toLocaleLowerCase())
        if (index < 0) state.push(widget)
        else throw Error(`Duplicate widget name [${widget.name}]`)
        return state
      })
    }, [])
  }
}

export function Provider({children}: {
  children?: React.ReactNode
}) {
  const value = useProvider()
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}