/**
 * prints extra argument and can be use as expression instead of `throw new Error()` statement
 * @type {(m: string, ...rest: any[])=> any}
 */
exports.err = (m, ...rest) => {
  console.log(m, ...rest)
  process.exit(1)
}
