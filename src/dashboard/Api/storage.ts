import { TWidget, TTab } from "./types"
import { TInheritArraySimpleObject, TInheritSimpleObject } from "../../util/types"

export const widgetKeyPrefix = "widget"
export const tabKeyPrefix = "tab"
export type TStackMap = TInheritSimpleObject<{
  [widgetKeyPrefix]: TWidget,
  [tabKeyPrefix]: TTab
}>
export type TStack = TStackMap[keyof TStackMap]
export type TKeyprefix = keyof TStackMap//TExtractKeyByValue<TStackMap, TStack>

const _Stack: TInheritArraySimpleObject<TStackMap> = {
  [widgetKeyPrefix]: [],
  [tabKeyPrefix]: []
}


function saveStack<T extends TKeyprefix>(key: T) {
  if (_Stack[key].length) {
    const stackStr = _Stack[key].map(({id}) => id).join(":")
    localStorage.setItem(`${key}:stack`, stackStr)
  } else {
    localStorage.removeItem(`${key}:stack`)
  }
}

export function addItem<T extends TKeyprefix>(key: T, item: TStackMap[T]) {
  localStorage.setItem(`${key}:${item.id}`, JSON.stringify(item))
  _Stack[key].push(item)
  saveStack(key)
}

export function setItem<T extends TKeyprefix>(key: T, item: TStackMap[T]) {
  localStorage.setItem(`${key}:${item.id}`, JSON.stringify(item))
  const index =_Stack[key].findIndex(({id}) => id === item.id)
  if (index >=0 ) _Stack[key][index] = {...item}
  saveStack(key)
}

export function removeItem<T extends TKeyprefix>(key: T, id: string) {
  localStorage.removeItem(`${key}:${id}`)
  const index = _Stack[key].findIndex(item => id === item.id)
  if (index >=0 ) _Stack[key].splice(index, 1)
  saveStack(key)
}

export function getStack<T extends TKeyprefix>(key: T): TStackMap[T][] {
  if (!_Stack[key].length) {
    const stackList = localStorage.getItem(`${key}:stack`)?.split(":")
    if (stackList === undefined ) return []
    
    for (let i=0; i < stackList.length; i++) {
      const id = stackList[i]
      const item = getItem<T>(key, id)
      if (item) _Stack[key].push(item)
    }
  }

  return _Stack[key].map(item => ({...item}))
}

function getItem<T extends TKeyprefix>(keyPrefix: T, id: string): TStackMap[T] | undefined {
  const item = localStorage.getItem(`${keyPrefix}:${id}`)
  return item ? JSON.parse(item) : undefined
}