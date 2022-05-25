import { TActionMap } from "../../../util/types"

type TReset = {
  maxScroll: number,
  counter: number
}

export type TState = TReset & {
  scroll: number,
  left: boolean,
  right: boolean
}

export enum StateActionType {
  RESET_SCROLL, STEP_LEFT, STEP_RIGHT
}

type TActionsPayload = {
  [StateActionType.RESET_SCROLL]: TReset,
  [StateActionType.STEP_LEFT]: number,
  [StateActionType.STEP_RIGHT]: number
}

export type TStateAction = TActionMap<TActionsPayload>[keyof TActionMap<TActionsPayload>];

export default function Reducer(state: TState, action: TStateAction) {
  switch(action.type) {
    case StateActionType.RESET_SCROLL:
      state.maxScroll = action.payload.maxScroll
      if (state.counter < action.payload.counter) {
        state.scroll = state.maxScroll
      }
      state.counter = action.payload.counter
      break;
    case StateActionType.STEP_LEFT:
      state.scroll -= action.payload
      break;
    case StateActionType.STEP_RIGHT:
      state.scroll += action.payload
      break;
  }

  if (state.maxScroll === 0) {
    state.scroll = 0
    state.left = false
    state.right = false
  } else if (state.scroll <=0) {
    state.scroll = 0
    state.left = false
    state.right = true
  } else if (state.scroll >= state.maxScroll) {
    state.scroll = state.maxScroll
    state.left = true
    state.right = false
  } else {
    state.left = true
    state.right = true
  }

  return {...state}
}