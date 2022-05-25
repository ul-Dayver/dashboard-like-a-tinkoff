import { TPartialWidgetView, TWidgetView,  } from "../../../Api/types"
import AbstractDragDropHandler from "../../../../util/abstractDragDropHandler"
import { defaultView } from "../../../Api/widgets"

class ChangeViewHandler extends AbstractDragDropHandler<TPartialWidgetView> {
  private currentView: TWidgetView = defaultView

  set view(wv: TWidgetView) {
    this.currentView = {...wv}
  }
  get view (): TWidgetView {
    return {...this.currentView}
  }

  private changeView(wv: TPartialWidgetView) {
    this.currentView = {...this.currentView, ...wv};
    this.handleEvent("change", [{...wv}])
  }

  onCentered({ offsetHeight, offsetWidth } : { offsetHeight: number, offsetWidth: number }) {
    const {height, width, centered} = this.currentView
    if (centered) {
      const x = (offsetWidth / 2) - (width / 2)
      const y = (offsetHeight / 2) - (height / 2)
      this.changeView({x, y, centered: false})
    }
  }

  resize({height, width, x, y}: TPartialWidgetView): boolean {
    const view:TPartialWidgetView = {}

    if (height !== undefined) {
      if (this.currentView.height + height <= 100) return false;
      view.height = this.currentView.height + height
    } 
    if (width !== undefined) {
      if (this.currentView.width + width <= 100) return false;
      view.width = this.currentView.width + width
    }
    if (x !== undefined) view.x = this.currentView.x + x
    if (y !== undefined) view.y = this.currentView.y + y

    this.changeView(view)
    return true
  }

  startDrag({pageX, pageY}: {pageX: number, pageY: number}) {
    super.startDrag({pageX, pageY})
    const {x,y} = this.currentView
    this.dragPoint = {y: pageY - y, x: pageX - x}
  }

  protected drag({pageX, pageY}: {pageX: number, pageY: number}) {
    if (this.dragPoint) {
      const y = pageY - this.dragPoint.y
      const x = pageX - this.dragPoint.x
      this.changeView({x, y, centered: false})
    }
  }
}

export default ChangeViewHandler