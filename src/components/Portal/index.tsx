import React from "react"
import {createPortal, unmountComponentAtNode} from "react-dom"
import "./style.scss"

type TProps = {
  children: React.ReactNode
}

const documentBody = (document.body || document.getElementsByTagName('body')[0])

function Portal(props: TProps) {
  const container = React.useMemo(() => {
    const el = document.createElement("div")
    el.className = "portal"
    documentBody.appendChild(el)
    return el
  }, [])
  React.useEffect(() => () => {
    unmountComponentAtNode(container)
    documentBody.removeChild(container)
  }, [container])
  return createPortal(props.children, container)
}

export default Portal