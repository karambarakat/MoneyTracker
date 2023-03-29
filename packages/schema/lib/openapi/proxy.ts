import { OpenAPIV3 as v3 } from 'openapi-types'
import { inspect } from 'util'
import DeepProxy, { TrapThisArgument } from 'proxy-deep'
import { merge } from 'lodash'
import _ from './builder'

export type docType = Omit<v3.Document, 'paths' | 'components'> & {
  components: Required<v3.ComponentsObject>
  paths: Record<string, Required<v3.PathItemObject>>
}

function getDoc(info: v3.Document['info']) {
  var doc: v3.Document = {
    openapi: '3.0.0',
    info: JSON.parse(JSON.stringify(info)),
    paths: {},
  }

  /**
   * 1. define component or paths on the spot
   * ex:
   *    doc === {}
   *    doc.components.callbacks.hi = {}
   *    doc === { components: { callback : { hi : {...} } } }
   *    doc.paths['/get/get'].post = { responses: {} }
   *    doc === { paths: { ['/get/get'] : { post : {...} } } }
   */

  /** */
  doc = new DeepProxy(doc, {
    get(target, prop) {
      debug.call(this, 'get', { target, prop })

      if (prop === 'components' || prop === 'paths') {
        return this.nest(Reflect.get(target, prop) ?? {})
      }

      if (
        (this.path.length <= 1 && this.path[0] === 'components') ||
        (this.path.length <= 1 && this.path[0] === 'paths')
      ) {
        return this.nest(Reflect.get(target, prop) ?? {})
      }

      // TypeError: Cannot create proxy with a non-object as target or handler
      const ref = Reflect.get(target, prop)
      return typeof ref === 'object' && ref !== null ? this.nest(ref) : ref
    },
    set(target, prop, value) {
      debug.call(this, 'set', { target, prop, value })

      if (
        (this.path[0] === 'components' && this.path.length === 2) ||
        (this.path[0] === 'paths' && this.path.length === 2)
      ) {
        return superSet(this.rootTarget, [...(this.path as any), prop], value)
      }

      return Reflect.set(target, prop, value)
    },
  })
  /** */

  /**
   * 3. integrate with builder pattern
   */
  doc = _.proxy(doc as any)
  return doc as docType
}

export default getDoc

// helper fn
export function debug(this: any, method: any, props: any) {
  return // for now do nothing

  // disable debug for props like Symbol.toStringTag and nodejs.util.inspect.custom

  if (props.prop === Symbol.toStringTag || props.prop === inspect.custom) {
    return
  }

  console.log(method, '>>', {
    this: this,
    ...props,
    // @ts-ignore
    Reflect: Reflect.get(...Object.values(props)),
  })
}

// helper fn
export function superSet<T extends object = object>(
  target: T,
  path: (keyof T)[],
  value: unknown
): boolean {
  if (path.length === 1) return Reflect.set(target, path[0], value)
  var pop = path.shift() as keyof T
  const rt = Reflect.set(target, pop, Reflect.get(target, pop) ?? {})
  return rt && superSet(target[pop] as any, path, value)
}
