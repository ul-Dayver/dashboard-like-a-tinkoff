import React from "react";
import { TPoint } from "../../../../../util/types"
import ResizeHandler from "./resizeHandler";

export type TSideProps = {
  onDrag: (pos: TPoint) => void,
  onStartDrag: () => void,
  onStopDrag: () => void,
  stopDrag: boolean,
  width: string,
  height: string,
  cursor: string,
  top ?: string,
  right ?: string,
  bottom ?: string,
  left ?: string
}

export default function useResizeHandler({stopDrag, onStartDrag, onStopDrag, onDrag}: TSideProps) {
  const resizeHandler = React.useRef<ResizeHandler>()
  
  const handleStartDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (resizeHandler.current) {
      resizeHandler.current.startDrag(e)
    }
  }

  React.useEffect(() => {
    if (stopDrag && resizeHandler.current) {
      resizeHandler.current.stopDrag()
    }
  }, [stopDrag])

  React.useEffect(() => {
    resizeHandler.current = new ResizeHandler()
  }, [])

  React.useEffect(() => {
    if (resizeHandler.current) {
      resizeHandler.current.addEventListener("change", onDrag)
      resizeHandler.current.addEventListener("startChange", onStartDrag)
      resizeHandler.current.addEventListener("stopChange", onStopDrag)
    }

    return () => {
      resizeHandler.current && resizeHandler.current.remove()
    }
  }, [onDrag, onStartDrag, onStopDrag])

  return { handleStartDrag }
}