import React from "react";
import { TWidgetAction, StateActionType, IWidget } from "./types"
import { getWidgetsByTabId, createWidget, defaultView } from '../../Api/widgets'
import { TPartialWidgetView } from '../../Api/types'
import { TSize } from "../../../util/types";
import { TWidgetSet } from "../../widgets"

export function createActions(dispatch: React.Dispatch<TWidgetAction>) {
  return {
    addWidget: (tabId: string, {name, config, title, Component}: TWidgetSet) => {
      createWidget({name, view: {...defaultView, ...config}, tabId}).then(widget => {
        const payload = {id: widget.id, view:widget.view, title, Component}
        dispatch({type: StateActionType.ADD_WIDGET, payload})
      })
    },
    setWidgets: (tabId: string, metaWidgets: TWidgetSet[]) => getWidgetsByTabId(tabId).then(widgets => {
      if (widgets.length) {
        const payload = [] as IWidget[]
        metaWidgets.forEach(meta => {
          widgets.forEach(widget => {
            if (widget.name === meta.name) {
              payload.push({
                id: widget.id,
                title: meta.title,
                view: {...widget.view},
                Component: meta.Component
              })
            }
          })
        })
        dispatch({type: StateActionType.SET_WIDGETS, payload})
      } else {
        dispatch({type: StateActionType.SET_WIDGETS, payload: []})
      }
    }),
    closeWidget: (id: string) => dispatch({type: StateActionType.CLOSE_WIDGET, payload: id}),
    startChangeViewWidget: (id: string) => dispatch({type: StateActionType.CHANGE_VIEW_START_WIDGET, payload: id}),
    changeViewWidget: (id: string, view: TPartialWidgetView) => dispatch({type: StateActionType.CHANGE_VIEW_WIDGET, payload: {id, view}}),
    stopChangeViewWidget: () => dispatch({type: StateActionType.CHANGE_VIEW_END_WIDGET, payload: undefined}),
    selectedWidget: (id: string) => dispatch({type: StateActionType.SET_ACTIVE_WIDGET, payload: id}),
    toggleMaximizedWidget: (id: string) => dispatch({type: StateActionType.TOGGLE_MAXIMIZED_WIDGET, payload: id}),
    setBorderDashboard: (payload: TSize) => dispatch({type: StateActionType.SET_BORDER_DASHDOARD, payload})
  }
}