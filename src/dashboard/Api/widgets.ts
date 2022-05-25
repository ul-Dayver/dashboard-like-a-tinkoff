import { TWidget, TPartialWidgetView, TWidgetView } from "./types"
import {
  widgetKeyPrefix,
  addItem,
  removeItem,
  setItem,
  getStack
} from "./storage"
import GenRandomKey from "../../util/randkey"

export const defaultView : TWidgetView = {
  width: 250,
  height: 400,
  centered: true,
  maximized: false,
  x: 1,
  y: 1,
  z: 1,
  minWidth: 100,
  minHeight: 80
}

export async function createWidget(widget: Omit<TWidget, "id">): Promise<TWidget> {
  const id = GenRandomKey()
  const ret = {...widget, id}
  addItem(widgetKeyPrefix, ret)
  return ret
}

export async function updateViewWidget(id: string, view: TPartialWidgetView): Promise<void> {
  const stack = getStack(widgetKeyPrefix)
  const widget = stack.find(item => item.id === id)
  if (widget) {
    widget.view = {...widget.view,...view}
    setItem(widgetKeyPrefix, widget)
  }
}

export async function deleteWidget(id: string): Promise<void> {
  removeItem(widgetKeyPrefix, id)
}

export async function getWidgetsByTabId(id: string): Promise<TWidget[]> {
  const widgets = getStack(widgetKeyPrefix)
  return widgets.filter(wgt => wgt.tabId === id)
}
/*
export async function fetchWidgets(): Promise<TWidget[]> {
  return getStack(widgetKeyPrefix)
}
*/