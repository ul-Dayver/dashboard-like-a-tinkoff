import React from "react";
import "./style.scss"
import { TTab, TTabHandle } from "../../Api/types"
import CloseIcon from "../../../icon/Close"

export const SelectedTab = "app-core-dashboard-tab_active"

function TabItem(props: TTab & TTabHandle) {
  const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    props.close(props.id)
    return false
  }
  const handleClickSelf = () => !props.active && props.setActive(props.id)
  return (
    <div className={`app-core-dashboard-tab ${props.active ? SelectedTab :""}`} onClick={handleClickSelf}>
      <div className="app-core-dashboard-tab-title">{props.title}</div>
      <div className="app-core-dashboard-tab-clsbttn" title="Закрыть" onClick={handleClickClose}>
        <span className="app-icon-interactive app-icon"><CloseIcon /></span>
      </div>
    </div>
  )
}

export default React.memo(TabItem)