import React from "react"
import { Provider as WidgetsProvider } from "./widgets"
import Tabs from "./Tabs"
import useTabs from "./Tabs/useTabs";
import Area from "./Area"
import "./style.scss"

type Props = {
  children?: React.ReactNode;
}
export default function Dashboard ({children}: Props) {
  const tabsProps = useTabs()
  const activeTabId = React.useMemo(() => tabsProps.tabs.find(({active}) => !!active), [tabsProps.tabs])?.id
  return (
    <main className="app-core-dashboard">
      <Tabs {...tabsProps}/>
      <WidgetsProvider>
        {children}
        {!activeTabId ? null : <Area tabId={activeTabId}/>}
      </WidgetsProvider>
    </main>
  )
}