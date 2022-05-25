import { TInheritSimpleObject, TSize, TPoint } from "../../../util/types"
type TGuide = TInheritSimpleObject<TPoint & TSize>
type TGuides = TGuide[]

type TGuideX = {x: number, height: number}
type TGuideY = {y: number, width: number}

export type TGuidesProps = {
  border: TSize
  filling: TGuides
  originalView: TSize & TPoint
  changedView: Partial<TSize & TPoint>
}

const margin = 10
export type TGuideLines = { xLines:TGuideX[], yLines: TGuideY[], view: Partial<TSize & TPoint> }
export default function getGuideLines ({border, filling, changedView, originalView}: TGuidesProps): TGuideLines {
  const xLines: TGuideX[] = []
  const yLines: TGuideY[] = []
  const view: Partial<TSize & TPoint> = {}

  const {x, y, height, width} = changedView

  const addX = (x: number, value: number): number => {
    if (x >= value - margin && x <= value + margin) {
      const index = xLines.findIndex(({x}) => x === value || x === value - margin || x === value + margin)
      if (index < 0) {
        if (changedView.x){
          view.x = value 
          if (changedView.width) view.width = (originalView.width + originalView.x) - value
          else view.x = x === originalView.width + originalView.x ? value - originalView.width : value
        } else view.width = value - originalView.x
        
        return xLines.push({x: value, height: border.height})
      }
    }
    return xLines.length
  }

  const addY = (y: number, value: number): number => {
    if (y >= value - margin && y <= value + margin) {
      const index = yLines.findIndex(({y}) => y === value || y === value - margin || y === value + margin)
      if (index < 0) {
        if (changedView.y){
          view.y = value 
          if (changedView.height) view.width = (originalView.height + originalView.y) - value
          else view.y = y === originalView.height + originalView.y ? value - originalView.height : value 
        } else view.height = value - originalView.y

        return yLines.push({y: value, width: border.width})
      }
    }
    return yLines.length
  }

  if (x) {
    if (x - margin <= 0) {
      xLines.push({x: 0, height: border.height})
      view.x = 0
      if (width) view.width = originalView.x + originalView.width
    } else if (!width && x + originalView.width + margin >= border.width ) {
      xLines.push({x: border.width, height: border.height})
      view.x = border.width - originalView.width
    } else {
      let i=0;
      const xOriginalWidth = x + originalView.width
      
      while (i < filling.length) {
        if (
          originalView.y + originalView.height + margin >= filling[i].y &&
          originalView.y <= filling[i].y + filling[i].height + margin
        ) {
          const fx = filling[i].x
          const fxw = fx + filling[i].width
          if (
            addX(x, fx) || addX(x, fxw) ||
            addX(xOriginalWidth, fx) || addX(xOriginalWidth, fxw)
          ) break;
        }
        i++
      } 
    }
  } else if (width) {
    if (originalView.x + width + margin >= border.width) {
      xLines.push({x: border.width, height: border.height})
      view.width = border.width
    } else {
      const wOriginalX = originalView.x + width
      let i=0;
      while (i < filling.length) {
        if (
          originalView.y + originalView.height + margin >= filling[i].y &&
          originalView.y <= filling[i].y + filling[i].height + margin
        ) {
          const fx = filling[i].x
          const fxw = fx + filling[i].width
          if (addX(wOriginalX, fx) || addX(wOriginalX, fxw)) break;
        }
        i++
      } 
    }
  }

  if (y) {
    if (y - margin <= 0) {
      yLines.push({y: 0, width: border.width})
      view.y = 0
      if (height) view.height = originalView.y + originalView.height
    } else if (!height && y + originalView.height + margin >= border.height ) {
      yLines.push({y: border.height, width: border.width})
      view.y = border.height - originalView.height
    } else {
      let i=0;
      const yOriginalHeight = y + originalView.height
      while ((i < filling.length)) {
        if (
          originalView.x + originalView.width + margin >= filling[i].x &&
          originalView.x <= filling[i].x + filling[i].width + margin
        ) {
          const fy = filling[i].y
          const fyh = fy + filling[i].height
          if (
            addY(y, fy) || addY(y, fyh) ||
            addY(yOriginalHeight, fy) || addY(yOriginalHeight, fyh)
          ) break;
        }
        i++
      } 
    }
  } else if (height) {
    if (originalView.y + height + margin >= border.height) {
      yLines.push({y: border.height, width: border.width})
      view.height = border.height
    } else {
      const hOriginalY = originalView.y + height
      let i=0;
      while (i < filling.length) {
        if (
          originalView.x + originalView.width + margin >= filling[i].x &&
          originalView.x <= filling[i].x + filling[i].width + margin
        ) {
          const fy = filling[i].y
          const fyh = fy + filling[i].height
          if (addY(hOriginalY, fy) || addY(hOriginalY, fyh)) break;
        }
        i++
      } 
    }
  }
  
  return {xLines, yLines, view}
}