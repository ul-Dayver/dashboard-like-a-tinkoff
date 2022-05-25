import { TActionMap } from "../types"

export type TReset = {
  maxScroll: number,
  scroll: number
}

export type TState = TReset & {
  from: boolean,
  to: boolean
}

export enum StateActionType {
  SET_SCROLL, STEP_FROM, STEP_TO
}

type TActionsPayload = {
  [StateActionType.SET_SCROLL]: TReset,
  [StateActionType.STEP_FROM]: undefined,
  [StateActionType.STEP_TO]: undefined
}

export type TStateAction = TActionMap<TActionsPayload>[keyof TActionsPayload];
export const STEP = 1
export default function Reducer(state: TState, action: TStateAction) {
  switch(action.type) {
    case StateActionType.SET_SCROLL:
      state.maxScroll = action.payload.maxScroll <=0 ? 0 : action.payload.maxScroll
      state.scroll = action.payload.scroll
      if (state.scroll + STEP >= state.maxScroll) state.scroll = state.maxScroll
      else if (state.scroll - STEP <= 0) state.scroll = 0
      break;
    case StateActionType.STEP_FROM:
      state.scroll -= STEP
      break;
    case StateActionType.STEP_TO:
      state.scroll += STEP
      break;
  }

  if (state.maxScroll === 0) {
    state.scroll = 0
    state.from = false
    state.to = false
  } else if (state.scroll <= 0) {
    state.scroll = 0
    state.from = false
    state.to = true
  } else if (state.scroll >= state.maxScroll) {
    state.scroll = state.maxScroll
    state.from = true
    state.to = false
  } else {
    state.from = true
    state.to = true
  }

  return {...state}
}