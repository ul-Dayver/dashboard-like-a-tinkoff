import useScroll from "."

export default function useScrollableTop() {
  const { state, targetRef, actionStepFrom, setScroll, actionStepTo } = useScroll("left")
  const { from, to } = state
  
  return {
    setScroll,
    left: from,
    right: to,
    handleLeft: actionStepFrom,
    handleRight: actionStepTo,
    targetRef
  }
}