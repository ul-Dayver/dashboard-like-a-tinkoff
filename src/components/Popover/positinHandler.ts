const documentBody = (document.body || document.getElementsByTagName('body')[0])

export default function PositionHandler(
  target: HTMLElement,
  container: HTMLElement
) {
  target.style.display = "block"
  const position = target.getBoundingClientRect()
  target.style.display = "none"
  container.style.position = "absolute";
  container.style.left = "0px";
  container.style.top = "0px";
  container.style.display = "block";
  let {x, y} = position
  
  if ( container.offsetWidth + x > documentBody.offsetWidth ) {
    x = documentBody.offsetWidth - container.offsetWidth
  } else if (x < 0) x = 0
  if ( container.offsetHeight + y > documentBody.offsetHeight ) {
    y = documentBody.offsetHeight - container.offsetHeight
  } else if (y < 0) y = 0
  
  container.style.transform = `translate(${x}px, ${y}px)`
}