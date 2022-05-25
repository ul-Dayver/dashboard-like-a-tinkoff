import { TActionMap, TSize } from "../../../util/types"
import {TWidgetView, TPartialWidgetView } from "../../Api/types"
import { TGuideLines } from '../Guides/getGuideLines'

export enum StateActionType {
  SET_WIDGETS = 0,
  ADD_WIDGET = 1,
  CLOSE_WIDGET = 2,
  SET_ACTIVE_WIDGET = 3,
  CHANGE_VIEW_WIDGET = 4,
  SET_BORDER_DASHDOARD = 5,
  CHANGE_VIEW_START_WIDGET = 6,
  CHANGE_VIEW_END_WIDGET = 7,
  TOGGLE_MAXIMIZED_WIDGET = 8
}
export interface IWidget {
  id: string,
  title: string,
  view: TWidgetView,
  Component: () => JSX.Element
}

type TActionsPayload = {
  [StateActionType.SET_WIDGETS]: IWidget[],
  [StateActionType.ADD_WIDGET]: IWidget,
  [StateActionType.CLOSE_WIDGET]: string,
  [StateActionType.SET_ACTIVE_WIDGET]: string,
  [StateActionType.CHANGE_VIEW_WIDGET]: {id: string, view: TPartialWidgetView},
  [StateActionType.CHANGE_VIEW_END_WIDGET]: undefined,
  [StateActionType.CHANGE_VIEW_START_WIDGET]: string,
  [StateActionType.SET_BORDER_DASHDOARD]: TSize,
  [StateActionType.TOGGLE_MAXIMIZED_WIDGET]: string
}

export type TWidgetAction = TActionMap<TActionsPayload>[keyof TActionsPayload];


export type TState = {
  widgets: IWidget[],
  lastChangedViewId ?: string,
  border?: TSize,
  guides?: TGuideLines
}

export const defaultState: TState = { widgets: [] as IWidget[] }