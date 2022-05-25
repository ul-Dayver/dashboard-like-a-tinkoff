import React from "react";
import useResizeHandler, {TSideProps} from "./useResizeHandler"

const position = "absolute"
const userSelect = "none"
const zIndex = 2020

function Side(props: TSideProps) {
  const { handleStartDrag } = useResizeHandler(props)
  const {width, height, cursor, top, right, bottom, left} = props
  
  return (
    <div onMouseDown={handleStartDrag} onDragStart={() => false}
        style={{position, userSelect, zIndex, width, height, cursor, top, right, bottom, left}}></div>
  )
}

export default Side