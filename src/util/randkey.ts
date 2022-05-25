const seenKeys: {[key: string]: boolean} = {}
const MULTIPLIER = Math.pow(2, 24)

export default function() {
    let key: void | string = void 0
    while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
      key = Math.floor(Math.random() * MULTIPLIER).toString(32)
    }
    seenKeys[key] = true
    return key
}