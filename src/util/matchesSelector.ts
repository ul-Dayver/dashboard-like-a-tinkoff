
let matchesSelectorFunc: string | undefined = ""
export function matchesSelector(el:  Node, selector: string): boolean {
  if (matchesSelectorFunc !== undefined && !matchesSelectorFunc.length) {
    matchesSelectorFunc = [
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector'
    ].find(method => method in el )
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  if (!matchesSelectorFunc || !(typeof el[matchesSelectorFunc] === 'function' || Object.prototype.toString.call(el[matchesSelectorFunc]) === '[object Function]') ) return false;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  return el[matchesSelectorFunc](selector);
}

// Works up the tree to the draggable itself attempting to match selector.
export function matchesSelectorAndParentsTo(el: Node, selector: string, baseNode: Node): boolean {
  let node: Node | null = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}