/**
 * @type {(...args: Parameters<_fetch>) => Promise<Response & { get : (cb: ((a:safeAny) => any)) => Promise<any>}> }
 */
exports.fetch = async (...args) =>
  //@ts-ignore
  import('node-fetch')
    .then((m) => m.default)
    .then((fetch) => fetch(...args))
    .then((res) => {
      let body
      Object.defineProperty(res, 'get', {
        value: async function (acc) {
          if (res.ok) {
            if (!body) body = (await res.json()) || {}
            return acc(body)
          }
        },
      })
      return res
    })
exports._fetch = import('node-fetch').then((m) => m.default)

/**
 * possible undefined but can be optionally chained
 *
 * i.e. :give an error when you try to access property but works fine when you use optional chaining
 *
 * note: this is how optional chaining shoud work with `unknown` but idw and I don`t wanna bother
 * @example safeAny.hi.hi.hi.hi // error
 * @example safeAny?.hi?.hi?.hi?.hi // works
 * @example safeAny?.hi === "random" // works
 * @typedef {undefined | ({[k: string]: safeAny} & (boolean | string | number | function))} safeAny
 */
