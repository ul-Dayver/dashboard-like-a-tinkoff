import { deleteWidget, updateViewWidget } from '../../Api/widgets'
import getGuideLines, { TGuideLines } from '../Guides/getGuideLines'
import { IWidget, TState, TWidgetAction, StateActionType } from "./types"

export function Reducer(state: TState, action: TWidgetAction) :TState {
  let widgets: IWidget[] = state.widgets
  //let changedView: Partial<TSize & TPoint> | undefined
  let guides: TGuideLines | undefined = state.guides
  let border = state.border
  let lastChangedViewId = state.lastChangedViewId
  switch(action.type) {
    case StateActionType.SET_WIDGETS:
      return {...state, widgets: action.payload}

    case StateActionType.ADD_WIDGET:
      widgets.push(action.payload)
      break;

    case StateActionType.CHANGE_VIEW_START_WIDGET:
      lastChangedViewId = action.payload
    case StateActionType.SET_ACTIVE_WIDGET:
      widgets = ((id, widgets) => {
        const index = widgets.findIndex((w) => w.id === id)
        return widgets.map((wgt, i) => {
          if (wgt.view.z === 1 && i !== index) return wgt
          else {
            const view = {...wgt.view, z: i === index ? 2 : 1 }
            updateViewWidget(wgt.id, view)
            return {...wgt, view}
          }
        })
      })(action.payload, widgets)
      break;

    case StateActionType.CLOSE_WIDGET:
      deleteWidget(action.payload)
      widgets = ((id, _stack) => {
        const index = _stack.findIndex((w) => w.id === id)
        _stack.splice(index, 1)
        return _stack
      })(action.payload, widgets)
      break;

    case StateActionType.CHANGE_VIEW_WIDGET:
      return (({id, view}) => {
        const index = widgets.findIndex((w) => id === w.id)
        const wgt = widgets[index]
        wgt.view = {...wgt.view, ...view}
        updateViewWidget(wgt.id, wgt.view)
        let guides = undefined
        if (border && lastChangedViewId === id) {
          guides = getGuideLines({
            border,
            originalView: {...wgt.view},
            changedView: {...view},
            filling: widgets.filter((wgt) => wgt.id !== id).map(wgt => ({...wgt.view}))
          })
        }

        return { widgets, border, guides, lastChangedViewId}
      })(action.payload)

    case StateActionType.CHANGE_VIEW_END_WIDGET:
      if (guides && lastChangedViewId) {
        const index = widgets.findIndex((w) => lastChangedViewId === w.id)
        const wgt = widgets[index]
        wgt.view = {...wgt.view, ...guides.view}
        updateViewWidget(wgt.id, wgt.view)
      }
      guides = undefined
      lastChangedViewId = undefined
      break;

    case StateActionType.SET_BORDER_DASHDOARD:
      border = action.payload
      break;
    case StateActionType.TOGGLE_MAXIMIZED_WIDGET:
      ((id: string)=>{
        const index = widgets.findIndex((w) => w.id === id)
        const wgt = widgets[index]
        wgt.view = {...wgt.view, maximized: !wgt.view.maximized}
        updateViewWidget(wgt.id, wgt.view)
      })(action.payload)
      break;
  }
  return {guides, widgets, border, lastChangedViewId}
}