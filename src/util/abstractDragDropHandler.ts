import { TInheritSimpleObject, TInheritArraySimpleObject, TMousePosition, VoidArrowFunction, TPoint } from "./types"

export type TChangeEventCallBack<E> = (p: E) => void

type TEventList<E> = {
  startChange: VoidArrowFunction,
  change: TChangeEventCallBack<E>,
  stopChange: VoidArrowFunction
}
type TEventListenerPayload<E> = TInheritSimpleObject<TEventList<E>>
type TEventListeners<E> = TInheritArraySimpleObject<TEventListenerPayload<E>>
type TEvent<E> = keyof TEventListeners<E>

type TMouseEventListener = (e: MouseEvent) => void

abstract class DragDropHandler<E> {
  protected dragPoint: TPoint | null = null
  private dragListener: undefined | TMouseEventListener
  private stopDragListener: undefined | TMouseEventListener
  
  protected listeners: TEventListeners<E> = {
    change: [], stopChange: [], startChange: []
  }

  protected handleEvent<T extends TEvent<E>>(event: T, props: TEventList<E>[T] extends VoidArrowFunction ? void : Parameters<TEventList<E>[T]>) {
    const hook = (callback: (...args: any) => any, props ?: any) => callback.apply(undefined, props)/* eslint-disable-line */
    this.listeners[event].forEach(callback => hook(callback, props))
  }

  addEventListener<T extends TEvent<E>>(event: T, callback: TEventList<E>[T]) {
    this.listeners[event].push(callback)
  }

  remove() {
    this.listeners = {change: [], stopChange: [], startChange: []}
    this.stopDrag()
  }

  startDrag({pageX, pageY}:TMousePosition) {
    this.dragPoint = {y: pageY, x: pageX}

    this.dragListener = (e: MouseEvent) => this.drag(e)
    this.stopDragListener = (e: MouseEvent) => this.stopDrag()/* eslint-disable-line */

    window.addEventListener("mousemove", this.dragListener)
    window.addEventListener("mouseup", this.stopDragListener)

    this.handleEvent("startChange", undefined)
  }

  stopDrag() {
    this.dragPoint = null;
    this.stopDragListener && window.removeEventListener("mouseup", this.stopDragListener);
    this.dragListener && window.removeEventListener("mousemove", this.dragListener);

    this.dragListener = undefined
    this.stopDragListener = undefined
    this.handleEvent("stopChange", undefined)
  }

  protected abstract drag({pageX, pageY}: {pageX: number, pageY: number}): void;
}

export default DragDropHandler