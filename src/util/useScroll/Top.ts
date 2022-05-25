import useScroll from "."

export default function useScrollableTop() {
  const { state, targetRef, actionStepFrom, setScroll, actionStepTo } = useScroll("top")
  const { from, to } = state
  
  return {
    setScroll,
    top: from,
    bottom: to,
    handleTop: actionStepFrom,
    handleBottom: actionStepTo,
    targetRef
  }
}