import React from "react";
import { TGuideLines } from "./getGuideLines"
import "./style.scss"

function Guides(props: {guides: TGuideLines}) {
  const {xLines, yLines} = props.guides

  return (
    <React.Fragment>
      {xLines.map(guide => <VerticalGuide key={JSON.stringify(guide)} {...guide} />)}
      {yLines.map(guide => <HorizontalGuide key={JSON.stringify(guide)} {...guide} />)}
    </React.Fragment>
  )
}

function VerticalGuide({x, height}: {x: number, height: number}) {
  return <div className="guide-vertical" style={{transform: `translate(${x}px, 0px)`, height: height+"px"}}></div>
}
function HorizontalGuide({y, width}: {y: number, width: number}) {
  return <div className="guide-horizontal" style={{transform: `translate(0px, ${y}px)`, width: width+"px"}}></div>
}

export default React.memo(Guides)