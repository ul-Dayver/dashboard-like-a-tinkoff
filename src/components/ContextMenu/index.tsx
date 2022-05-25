import React from "react";
import "./style.scss"
import MenuItem, {IItem} from "./item"
import Popover from "../Popover";

type TProps = {
  open: 0 | 1,
  items: IItem[],
  onClose?: () => void,
  onSelect: (value: string) => void
}

function Menu(props: TProps) {
  const handleSelect = (value: string) => {
    props.onSelect(value)
  }

  return props.open ? (
    <Popover onOutClick={props.onClose}>
      <div className="context-menu">
        {props.items.map(item => <MenuItem {...item} key={item.value} onSelect={handleSelect} />)}
      </div>
    </Popover>
  ) : null
}

export default Menu