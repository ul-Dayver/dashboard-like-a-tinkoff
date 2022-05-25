import {TSimpleObject} from "./types"
interface IElement extends Element, TSimpleObject {}
export function getAttr(el: IElement, name: string): string | null {
  if (el.hasAttribute && el.hasAttribute(name)){
    return el.getAttribute(name);
  } else {
    const ret = el[name]
    if (typeof(ret) === 'string') return ret;
  }
  return null;
}

export function setAttribute (el: IElement, name: string, value: string){
  if (el.setAttribute) {
    el.setAttribute(name, value)
  } else {
    const attr = el.getAttributeNode(name) || document.createAttribute(name)
    attr.nodeValue=value
    el.setAttributeNode(attr)
  }
}

export function removeAttribute (el: IElement, name: string) {
  if (el.removeAttribute) {
    el.removeAttribute(name)
  } else {
    const attr = el.getAttributeNode(name)
    if (attr) {
      el.removeAttributeNode(attr)
    }
  }
}