import React from "react"

export default function LayoutIcon({children, viewBox}:{children: React.ReactNode | React.ReactChild | string, viewBox?: string}) {
  return (
    <svg width="16" height="16" viewBox={viewBox || "0 0 16 16"} fill="none" xmlns="http://www.w3.org/2000/svg">
      {
        typeof children === "string"
        ? <path fill="rgb(var(--app-icon-color))" fillRule="evenodd" clipRule="evenodd" d={children}></path>
        : {children}
      }
    </svg>
  )
}