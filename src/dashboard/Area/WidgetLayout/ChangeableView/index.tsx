import React from "react";
import './style.scss'
import { TPartialWidgetView, TWidgetView } from "../../../Api/types"
import useChangeableView from "./useChangeableView"
import ResizeWindow from './resize'

type TProps = {
  view: TWidgetView,
  dragElementSelector: string,
  children:  React.ReactNode,
  onSelect: () => void,
  onStartChange: () => void,
  onStopChange: () => void,
  onChange: (view: TPartialWidgetView) => void
}

export default function ChangeableView (props: TProps) {
  const {
    selfRef,
    stopResize,
    handleResize,
    handleStartResize,
    handleStopResize,
    handleDragTrigger
  } = useChangeableView(props)
  return (
    <div className='app-changeable-view' ref={selfRef} onClick={props.onSelect} onMouseDown={handleDragTrigger} onTouchStart={handleDragTrigger}>
      {props.children}
      <ResizeWindow onStartResize={handleStartResize} onStopResize={handleStopResize} onResize={handleResize} stopResize={stopResize}/>
    </div>
  )
}