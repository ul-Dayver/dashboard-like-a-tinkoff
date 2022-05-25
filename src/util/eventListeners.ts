interface IEventTarget extends EventTarget {
    attachEvent ?: (event: string, listener: EventListener) => boolean;
    detachEvent ?: (event: string, listener: EventListener) => void;
}

export function addEvent(el: IEventTarget, event: string, handler: EventListener, inputOptions?: boolean | Record<string, unknown>): void {
  if (!el) return;
  if (el.addEventListener) {
    el.addEventListener(event, handler, typeof inputOptions === "boolean" ? inputOptions : {capture: true, ...inputOptions});
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    el['on' + event] = handler;
  }
}

export function removeEvent(el: IEventTarget, event: string, handler: EventListener, inputOptions?: boolean | Record<string, unknown>): void {
  if (!el) return;
  if (el.removeEventListener) {
    el.removeEventListener(event, handler, typeof inputOptions === "boolean" ? inputOptions : {capture: true, ...inputOptions});
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    el['on' + event] = null;
  }
}