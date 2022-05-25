import React from "react";
import "./style.scss"
import SunIcon from "../../icon/Sun"
import MoonIcon from "../../icon/Moon"

enum ThemeName {
  DARK = "dark",
  LIGHT = "light"
}
const storageKey = "theme"

function getThemeOS() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return ThemeName.DARK;
  }
  return ThemeName.LIGHT
}

let _theme = localStorage.getItem(storageKey)
if (!_theme) {
  _theme = getThemeOS()
  localStorage.setItem(storageKey, _theme)
}
document.documentElement.dataset.theme = _theme

function ThemeToggle() {
  const [theme, toggle] = React.useState<ThemeName>(document.documentElement.dataset.theme as ThemeName)
  const handleClick = () => toggle(theme === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT)
  React.useLayoutEffect(() => {
    localStorage.setItem(storageKey, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])
  return <span className="theme-toggle-bttn" onClick={handleClick}><span className="app-icon">{theme === ThemeName.LIGHT ? <MoonIcon /> : <SunIcon />}</span></span>
}

export default React.memo(ThemeToggle)