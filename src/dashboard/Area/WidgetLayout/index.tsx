import React, { useCallback } from 'react'
import './style.scss'
import FullScreenOnIcon from "../../../icon/FullScreenOn"
import FullScreenOffIcon from "../../../icon/FullScreenOff"
import CloseWindowIcon from "../../../icon/Close"
import { TPartialWidgetView } from "../../Api/types"
import { IWidget } from "../State/types"
import ChangeableView from "./ChangeableView"

export interface IWidgetLayoutHandlers {
  onChangeView: (id: string, p: TPartialWidgetView) => void
  onStartChangeView: (id: string) => void
  onStopChangeView: () => void
  onClose : (id: string) => void
  onActivate: (id: string) => void
  onMaximize: (id: string) => void
}

function Layout({
  id, title, children, view, onMaximize, onClose
}: IWidget & IWidgetLayoutHandlers & {children: React.ReactNode}) {
  return (
    <div className='app-widget-layout'>
      <div className='app-widget-layout-header'>
        <div className='app-widget-layout-header-title'>{title}</div>
        <div className='app-widget-layout-header-toolbar'>
          <div className='app-widget-layout-header-bttn' title="Максимизировать" onClick={() => onMaximize(id)}>
            <span className="app-icon-interactive app-icon">
              {view.maximized ? <FullScreenOffIcon /> : <FullScreenOnIcon />}
            </span>
          </div>
          <div className='app-widget-layout-header-bttn' title="Закрыть" onClick={() => onClose(id)}>
            <span className="app-icon-interactive app-icon"><CloseWindowIcon /></span>
          </div>
        </div>
      </div>
      <div className='app-widget-layout-body'>
        {children}
      </div>
    </div>
  )
}

function WidgetLayout(props: IWidget & IWidgetLayoutHandlers) {
  const { id, view, Component, onActivate, onStartChangeView, onStopChangeView, onChangeView } = props
  const handlers = {
    onSelect: useCallback(() => onActivate(id), [id, onActivate]),
    onChange: useCallback((view: TPartialWidgetView) => onChangeView(id, view), [id, onChangeView]),
    onStartChange: useCallback(() => onStartChangeView(id), [id, onStartChangeView]),
    onStopChange: useCallback(() => onStopChangeView(), [onStopChangeView]),
  }

  return view.maximized ? <Layout {...props}><Component /></Layout> : (
    <ChangeableView 
      view={view}
      dragElementSelector=".app-widget-layout-header"
      {...handlers}
    >
      <Layout {...props}><Component /></Layout>
    </ChangeableView>
  )
}

export default React.memo(WidgetLayout, (prevProps, nextProps) => prevProps.view === nextProps.view)