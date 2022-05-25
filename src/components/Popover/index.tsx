import React from "react";
import "./style.scss"
import Portal from "../Portal";
import {useGlobalClick} from "../../util/useWindowEvent"
import PositionHandler from "./positinHandler";

function Popover({
  children,
  onOutClick
}:{
  children: React.ReactNode,
  onOutClick ?: () => void
}) {
  const target = React.useRef<HTMLDivElement>(null)
  const container = React.useRef<HTMLDivElement>(null)


  React.useLayoutEffect(() => {
    target.current && container.current && PositionHandler(target.current, container.current)
  }, [])

  useGlobalClick(() => onOutClick && window.requestAnimationFrame(onOutClick))

  return (
    <React.Fragment>
      <div className="popover-anchor" ref={target} />
      <Portal>
        <div className="popover-container" ref={container}>
          {children}
        </div>
      </Portal>
    </React.Fragment>
  )
}

export default Popover