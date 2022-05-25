import React from "react"
import { addEvent, removeEvent } from "./eventListeners"

export function useWindowEvent(event: string, handler: EventListener) {
  React.useLayoutEffect(() => {
    addEvent(window, event, handler)
    return () => removeEvent(window, event, handler, false)
  }, [event, handler])
}

const createUseWindowEvent = (event: string) => (callback:EventListener) => useWindowEvent(event, callback)

export const useGlobalClick = createUseWindowEvent("click")
export const useGlobalScroll = createUseWindowEvent("scroll")
export const useGlobalResize = createUseWindowEvent("resize")