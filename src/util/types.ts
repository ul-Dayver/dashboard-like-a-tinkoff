export type TSimpleObject = { [index: string]: unknown }
export type TMouseEventListener = (e: MouseEvent) => void
export type TInheritSimpleObject<T extends TSimpleObject> = {[Key in keyof T]: T[Key]}
export type TInheritArraySimpleObject<T extends TSimpleObject> = {[Key in keyof T]: Array<T[Key]>}
export type TMousePosition = {pageY: number, pageX: number}
export type TPoint = {x: number, y: number}
export type TSize = {width: number, height: number}
export type VoidArrowFunction = () => void
export type TActionMap<T extends { [index: string]: unknown }> = {
  [Key in keyof T]: T[Key] extends null | undefined ? {
    type: Key
    payload ?: T[Key]
  } : {
    type: Key
    payload: T[Key]
  }
};
export type TExtractKeyByValue<T extends TSimpleObject, V> = keyof {
  [P in keyof T]: T[P] extends V ? V : never
}