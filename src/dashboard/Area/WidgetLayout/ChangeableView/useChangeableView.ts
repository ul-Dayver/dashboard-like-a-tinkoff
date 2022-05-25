import React, { useLayoutEffect, useEffect } from "react"
import { TPartialWidgetView, TWidgetView } from "../../../Api/types"
import { TChangeEventCallBack } from "../../../../util/abstractDragDropHandler"
import ChangeViewHandler from "./handler"
import {matchesSelectorAndParentsTo} from "../../../../util/matchesSelector"

interface IOuterHandlers {
  onChange: TChangeEventCallBack<TPartialWidgetView> 
  onStopChange: () => void
  onStartChange: () => void
}

export default function useChangeableView(props: IOuterHandlers & { dragElementSelector: string, view: TWidgetView })  {
  const { onChange, onStopChange, onStartChange, view, dragElementSelector } = props
  const selfRef = React.useRef<HTMLDivElement>(null)
  const [stopResize, setStopResize] = React.useState(false)
  
  const handler = React.useRef<ChangeViewHandler>()
  
  useLayoutEffect(() => {
    handler.current = new ChangeViewHandler()
  }, [])
  useLayoutEffect(() => {
    if (handler.current) {
      handler.current.addEventListener("change", (view: TPartialWidgetView) => onChange(view))
      handler.current.addEventListener("startChange", onStartChange)
      handler.current.addEventListener("stopChange", onStopChange)
    }
    return () => handler.current && handler.current.remove()
  }, [onChange, onStartChange, onStopChange])

  const setStyleElement = React.useCallback(() => {
    if (selfRef.current && handler.current) {
      const {x, y, height, width, z, minHeight, minWidth, maximized} = handler.current.view
      const element = selfRef.current
      element.style.transform = `translate(${maximized ? 0 : x}px, ${maximized ? 0 : y}px)`
      element.style.width = maximized ? "100vw" : width + "px",
      element.style.height = maximized ? "calc(100% + var(--app-core-dashboard-area-margin-bottom) / 2)" : height + "px",
      element.style.zIndex = maximized ? "1000" : z + "",
      element.style.minHeight = minHeight + "px",
      element.style.minWidth = minWidth + "px",
      element.style.marginTop = maximized ? "-1px" : "0"
      element.style.display = "block";
    }
  }, [])

  const handleDragTrigger = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (!selfRef.current || !handler.current) return;
    const element = e.target as HTMLElement
    if (matchesSelectorAndParentsTo(element, dragElementSelector, selfRef.current)) {
      if ("touches" in e) {
        handler.current.startDrag(e.touches[0])
      } else if ("pageX" in e && "pageY" in e) {
        handler.current.startDrag(e)
      }
    }
  }

  useEffect(() => {
    if (handler.current) {
      handler.current.view = view
      setStyleElement()
    }
  }, [view, setStyleElement])
  
  useEffect(() => {
    if (selfRef.current && handler.current) {
      if (selfRef.current.parentElement) {
        handler.current.onCentered(selfRef.current.parentElement)
      }
    }
    return () => handler.current && handler.current.remove()
  }, [handler])

  return {
    selfRef, stopResize,
    handleDragTrigger,
    handleStopResize: props.onStopChange,
    handleStartResize: React.useCallback(() => {
      onStartChange()
      setStopResize(false)
    },[onStartChange]),
    handleResize: React.useCallback((p: TPartialWidgetView) => {
      if (!selfRef.current || !handler.current || !handler.current.resize(p)) {
        setStopResize(true)
      } else setStyleElement()
    }, [setStyleElement])
  }
}