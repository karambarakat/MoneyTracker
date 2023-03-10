/**
 * @typedef {(cb?: ((a:safeAny) => any)) => Promise<any>} Get
 */

/**
 * @type {(...args: Parameters<_fetch>) => Promise<Response & { get : Get }> }
 */
exports.fetch = async (...args) =>
  import('node-fetch')
    .then((m) => m.default)
    .then((fetch) => fetch(...args))
    .then(async (res) => {
      var body
      try {
        body = await res.json()
      } catch {}
      Object.defineProperty(res, 'get', {
        value: async function (acc) {
          if (!res.ok) {
            // ???
          }
          return typeof acc === 'function' ? acc(body) : body
        },
      })
      return res
    })

exports._fetch = (...args) =>
  import('node-fetch').then((m) => m.default(...args))

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
