import React from "react";

export interface IItem {
  label: string,
  value: string
}

interface IProps extends IItem {
  onSelect: (value: string) => void
}

function MenuItem(props: IProps) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    props.onSelect(props.value)
    return false
  }

  return (
    <div className="context-menu-item" onClick={handleClick}>{props.label}</div>
  )
}

export default MenuItem