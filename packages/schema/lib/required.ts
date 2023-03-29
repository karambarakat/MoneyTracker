export default function required<T extends object>(
  obj: T,
  def: Required<T>
): Required<T> {
  return new Proxy(obj, {
    get(target, prop) {
      Reflect.set(target, prop, Reflect.get(def, prop))
      return Reflect.get(target, prop)
    },
  }) as Required<T>
}
