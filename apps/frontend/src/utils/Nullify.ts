type Nullify<T extends Record<string, any>> = {
  [P in keyof T]: T[P] | null
}
export default Nullify
