import "./style.scss"
import React from "react"
import useScrollableGroup from "./useScrollableGroup"
import Bttn, {Arrow} from "./bttn"
type TProps = {
  children: React.ReactNode[]
}

export default function ScrollableGroup({children}:TProps) {
  const {groupRef, handleLeft, handleRight, left, right } = useScrollableGroup(children.length)
  return (
    <>
    {left ? <Bttn onPress={handleLeft} arrow={Arrow.LEFT}/> : null}
    <div className="app-core-dashboard-tabs-group" ref={groupRef}>
      {children}
    </div>
    {right ? <Bttn onPress={handleRight} arrow={Arrow.RIGHT}/> : null}
    </>
  )
}