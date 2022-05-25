import React from "react";
import useState from "./State/useState";
import { Context, TWidgetSet } from "../widgets"
import { useGlobalResize } from "../../util/useWindowEvent"
import { IWidgetLayoutHandlers } from "./WidgetLayout";

export default function useArea(tabId: string) {
  const {state, action} = useState()
  const { widgets } = React.useContext(Context)
  const areaElement = React.useRef<HTMLDivElement>(null)

  const catchBorderArea = React.useCallback(() => {
    if (areaElement.current) {
      const height = areaElement.current.offsetHeight-5
      const width = areaElement.current.offsetWidth-1
      action.setBorderDashboard({height, width})
    }
  }, [action])

  React.useEffect(() => {
    action.setWidgets(tabId, widgets)
  }, [tabId, action, widgets])

  React.useLayoutEffect(catchBorderArea, [catchBorderArea])
  useGlobalResize(catchBorderArea)

  const addWidget = React.useCallback((widgetSet: TWidgetSet) => {
    action.addWidget(tabId, widgetSet)
  }, [action, tabId])
  const LayoutHandlers = React.useMemo<IWidgetLayoutHandlers>(() => ({
    onChangeView: action.changeViewWidget,
    onStartChangeView: action.startChangeViewWidget,
    onStopChangeView: action.stopChangeViewWidget,
    onClose : action.closeWidget,
    onActivate: action.selectedWidget,
    onMaximize: action.toggleMaximizedWidget
  }), [action])

  return {
    state,
    widgets,
    areaElement,
    addWidget,
    LayoutHandlers
  }
}