import { TTab } from "./types"
import {
  tabKeyPrefix,
  widgetKeyPrefix,
  addItem,
  removeItem,
  getStack,
  setItem
} from "./storage"
import GenRandomKey from "../../util/randkey"

export async function createTab(tab: Omit<TTab, "id" >): Promise<TTab> {
  const id = GenRandomKey()
  const ret = {...tab, id}
  addItem(tabKeyPrefix, ret)
  return ret
}

export async function deleteTab(id: string): Promise<void> {
  const widgets = getStack(widgetKeyPrefix)
  widgets.forEach(wgt => {
    if (wgt.tabId === id) removeItem(widgetKeyPrefix, wgt.id)
  })
  removeItem(tabKeyPrefix, id)
}

export async function fetchTabs(): Promise<TTab[]> {
  return getStack(tabKeyPrefix)
}

export async function updateTab(tab: TTab): Promise<void> {
  return setItem(tabKeyPrefix, tab)
}