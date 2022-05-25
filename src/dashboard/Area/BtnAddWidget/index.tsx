import React from "react";
import "./style.scss"
import { TWidgetSet } from "../../widgets"
import ContextMenu from "../../../components/ContextMenu"
import AddWidgetIcon from "../../../icon/AddWidget"

type Props = {
  widgets: TWidgetSet[]
  onSelect: (widgetSet: TWidgetSet) => void
}

enum MenuDisplay {
  HIDE,
  SHOW
}

function BttnAddWidget({ widgets, onSelect }: Props) {
  const [display, setDisplay] = React.useState(MenuDisplay.HIDE)
  const items = React.useMemo(() => widgets.map(wgt => ({
    label: wgt.title,
    value: wgt.name
  })), [widgets])
  const handleSelect = (name: string) => {
    setDisplay(MenuDisplay.HIDE)
    const widgetSet = widgets.find(w => w.name === name);
    widgetSet && onSelect(widgetSet)
  }
  
  return (
    <div className="app-core-dashboard-addwidget">
      <div className="app-core-dashboard-addwidget-bttn" onClick={() => setDisplay(MenuDisplay.SHOW)}>
        <span className="app-icon"><AddWidgetIcon /></span>
        <span>Добавить виджет</span>
      </div>
      <ContextMenu
        open={display}
        onClose={() => setDisplay(MenuDisplay.HIDE)}
        onSelect={handleSelect}
        items={items} 
      />
    </div>
  )
}

export default React.memo(BttnAddWidget)