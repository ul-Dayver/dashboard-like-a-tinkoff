import { TInheritSimpleObject, TPoint, TSize } from '../../util/types'

export type TWidgetView = TInheritSimpleObject<TPoint & TSize & {
  z: number
  centered: boolean
  maximized: boolean
  minWidth: number
  minHeight: number
}>

export type TPartialWidgetView = Partial<TWidgetView>


export type TWidget = {
  id: string
  name: string
  tabId: string
  view: TWidgetView
}

export type TTab = {
  id: string,
  title: string,
  active: boolean
}

export type TTabHandle = {
  add: () => void,
  close: (id: string) => void,
  setActive: (id: string) => void
}