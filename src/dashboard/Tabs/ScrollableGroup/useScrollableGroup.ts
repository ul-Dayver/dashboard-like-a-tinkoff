import React from "react"
import useScrollLeft from "../../../util/useScroll/Left"
import { SelectedTab } from "../Item"

export default function useScrollableGroup(groupCount: number) {
  const { setScroll, handleLeft, handleRight, targetRef, left, right } = useScrollLeft()
  const counter = React.useRef(groupCount)
  
  React.useLayoutEffect(() => {
    if (counter.current < groupCount && targetRef.current) {
      const element = targetRef.current.querySelector("."+SelectedTab) as HTMLElement
      if (element) {
        const rec = element.getBoundingClientRect()
        setScroll(rec.left + rec.width)
      }
    }
    counter.current = groupCount
  }, [groupCount, setScroll, targetRef])
  
  return {
    handleLeft, handleRight, groupRef: targetRef, left, right
  }
}