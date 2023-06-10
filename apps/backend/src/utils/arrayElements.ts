export function toggleArrayElement<T>(arr: T[], element: T): T[] {
  if (arr.some(e => e === element)) {
    arr.splice(
      arr.findIndex(e => e === element),
      1,
    )
    return arr
  } else {
    arr.push(element)
    return arr
  }
}

export function addArrayElement<T>(arr: T[], element: T): T[] {
  if (arr.some(e => e === element)) {
    return arr
  } else {
    arr.push(element)
    return arr
  }
}

export function removeArrayElement<T>(arr: T[], element: T): T[] {
  if (arr.some(e => e === element)) {
    arr.splice(
      arr.findIndex(e => e === element),
      1,
    )
    return arr
  } else {
    return arr
  }
}
