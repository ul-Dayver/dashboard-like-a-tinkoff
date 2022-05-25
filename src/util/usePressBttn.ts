import React from "react";

export default function usePressBttn(onPress: () => void) {
  const [press, setPress] = React.useState(false)
  const handleDown = () => setPress(true)
  const handleUp = () => setPress(false)
  const _animation = React.useRef<number>()
  React.useEffect(() => {
    if (_animation.current !== undefined) {
      window.cancelAnimationFrame(_animation.current)
      _animation.current = undefined
    }
    if (press) {
      const _press = () => window.requestAnimationFrame(() => {
        onPress()
        _animation.current = _press()
      })
      _animation.current = _press()
    }
    return () => { (_animation.current !== undefined) && window.cancelAnimationFrame(_animation.current) }
  }, [press, onPress])

  return [handleDown, handleUp]
}