export default function assignArg(obj: any[]) {
  return (...arg: any[]) => {
    obj = arg
  }
}
