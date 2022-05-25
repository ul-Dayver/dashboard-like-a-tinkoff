import React from "react"
import { defaultState } from "./types"
import { Reducer } from "./reducer"
import { createActions } from "./actions"

export default function useState() {
  const [state, dispatch] = React.useReducer(Reducer, defaultState)
  const action = React.useMemo(() => createActions(dispatch), [])
  
  return { state, action }
}