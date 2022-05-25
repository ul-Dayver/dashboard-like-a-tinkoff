import React from "react"
import { TPoint, TSize } from "../../../../../util/types"
import Side from "./side"

type TProps = {
  onResize: (event: Partial<TSize & TPoint>) => void,
  stopResize: boolean,
  onStopResize: () => void,
  onStartResize: () => void
}

function Resize({onStartResize, onResize, onStopResize, stopResize }: TProps) {
  const handle = React.useMemo(() => {
    return {
      top: (pos: TPoint) => onResize({height: -1 * pos.y, y: pos.y}),
      bottom: (pos: TPoint) => onResize({height: pos.y}),
      left: (pos: TPoint) => onResize({width: -1 * pos.x, x: pos.x}),
      right: (pos: TPoint) => onResize({width: pos.x}),
  
      topRight: (pos: TPoint) => onResize({height: -1 * pos.y, y: pos.y, width: pos.x}),
      topLeft: (pos: TPoint) => onResize({height: -1 * pos.y, y: pos.y, width: -1 * pos.x, x: pos.x}),
      bottomLeft: (pos: TPoint) => onResize({width: -1 * pos.x, height: pos.y, x: pos.x}),
      bottomRight: (pos: TPoint) => onResize({width: pos.x, height: pos.y})
    }
  }, [])/* eslint-disable-line */
  const common = {
    onStartDrag: onStartResize,
    onStopDrag: onStopResize,
    stopDrag: stopResize
  }
    
  return (
    <div>
      <Side width="100%" height="10px" cursor="row-resize" top="-6px" left="0px" onDrag={handle.top} {...common} />
      <Side width="10px" height="100%" cursor="col-resize" top="0px" right="-5px" onDrag={handle.right} {...common}/>
      <Side width="100%" height="10px" cursor="row-resize" bottom="-5px" left="0px" onDrag={handle.bottom} {...common}/>
      <Side width="10px" height="100%" cursor="col-resize" top="0px" left="-6px" onDrag={handle.left} {...common}/>
  
      <Side width="20px" height="20px" cursor="nesw-resize" top="-10px" right="-10px" onDrag={handle.topRight} {...common}/>
      <Side width="20px" height="20px" cursor="nwse-resize" bottom="-10px" right="-10px" onDrag={handle.bottomRight} {...common}/>
      <Side width="20px" height="20px" cursor="nesw-resize" bottom="-10px" left="-11px" onDrag={handle.bottomLeft} {...common}/>
      <Side width="20px" height="20px" cursor="nwse-resize" top="-11px" left="-11px" onDrag={handle.topLeft} {...common}/>
    </div>
  )
}
  
export default React.memo(Resize)