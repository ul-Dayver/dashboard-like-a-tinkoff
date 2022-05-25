import React from "react";
import ArrowLeftIcon from "../../../icon/ArrowLeft"
import ArrowRightIcon from "../../../icon/ArrowRight"
import usePressBttn from "../../../util/usePressBttn";

export enum Arrow {
  LEFT = "left", RIGHT = "right"
}

function Bttn({arrow, onPress}: {arrow: Arrow, onPress: () => void}) {
  const [handleDown, handleUp] = usePressBttn(onPress)

  return (
    <div className={`app-core-dashboard-tabs-scroll-bttn app-core-dashboard-tabs-scroll-bttn_${arrow}`} onMouseUp={handleUp} onMouseDown={handleDown}>
      <i className="app-icon">{arrow === Arrow.LEFT ? <ArrowLeftIcon /> : <ArrowRightIcon />}</i>
    </div>
  )
}

export default React.memo(Bttn)