import { TPoint } from "../../../../../util/types"
import AbstractDragDropHandler from "../../../../../util/abstractDragDropHandler"

export default class ResizeHandler extends AbstractDragDropHandler<TPoint> {
  protected drag({pageX, pageY}: {pageX: number, pageY: number}) {
    if (this.dragPoint) {
      this.handleEvent("change", [{y: pageY - this.dragPoint.y, x: pageX - this.dragPoint.x}])
      this.dragPoint = {y: pageY, x: pageX}
    }
  }
}