import React, { useEffect, useCallback } from "react"
import { useGlobalResize } from "../useWindowEvent"
import Reducer, { StateActionType, TState } from "./reducer"

const defaultState: TState = {from: false, to: false, scroll: 0, maxScroll: 0}
export default function useScrollable(key: "left" | "top") {
  const [state, dispatch] = React.useReducer(Reducer, defaultState)
  const { scroll } = state
  const property = React.useMemo(() => key === "left" ? "scrollLeft" : "scrollTop",[key])
  const targetRef = React.useRef<HTMLDivElement>(null)
  const actionStepFrom = useCallback(() => dispatch({type: StateActionType.STEP_FROM}),[])
  const actionStepTo = useCallback(() => dispatch({type: StateActionType.STEP_TO}),[])
  
  const setScroll = useCallback((_scroll ?: number) => {
    if (targetRef.current && targetRef.current.parentElement) {
      const scroll = _scroll !== undefined ? _scroll : targetRef.current.parentElement[property]
      const maxScroll = targetRef.current.offsetWidth - targetRef.current.parentElement.offsetWidth
      dispatch({type: StateActionType.SET_SCROLL, payload: { maxScroll, scroll } })
    }    
  }, [property])

  React.useEffect(() => {
    if (targetRef.current && targetRef.current.parentElement) {
      targetRef.current.parentElement.scroll({[key]: scroll})
    }
  }, [scroll, key])

  useGlobalResize(() => setScroll())

  useEffect(() => {
    if (targetRef.current && targetRef.current.parentElement) {
      let maxScroll = targetRef.current.offsetWidth - targetRef.current.parentElement.offsetWidth
      if (maxScroll < 0) maxScroll = 0
      if (maxScroll !== state.maxScroll) {
        dispatch({type: StateActionType.SET_SCROLL, payload: { maxScroll, scroll } })
      } 
    } 
  })
  
  return {
    actionStepFrom,
    actionStepTo,
    setScroll,
    state,
    targetRef
  }
}