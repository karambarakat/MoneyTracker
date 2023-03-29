import DeepProxy, { DeepProxyHandler, TrapThisArgument } from 'proxy-deep'
import type { docType } from './proxy'
import * as helpers from './proxy'
import { OpenAPIV3 as v3 } from 'openapi-types'
import buildComponent, {
  match as ComponentMatch,
  ComponentStep,
} from './component'
import buildOperation, {
  match as OperationMatch,
  OperationStep,
} from './operation'

// for every builder directory define a different Step type, and this type should be adjusted to be a union of all the step types
// see https://gist.github.com/karambarakat/b753999a9e7e3a34be137acb02ad01aa  for more information
type step = OperationStep | ComponentStep
type filter<T, U> = U extends { op: infer I; doc: infer O }
  ? O extends T
    ? I
    : never
  : never

// this object is only holding information about the desired document
//
// building the desired document should be handled by a different function and integrated into DeepProxy somewhere
// building the desired document need `path` and `rootTarget` which is only available through a proxy
class _ {
  // @ts-ignore - this code style is intended to ?comply? with `myBuilder.Builder` interface and eliminate the need of `new` keyword
  constructor() {}
  // to build the desired document a proxy should be used, see this.proxy
  build<T>(steps: filter<T, step>[]): T {
    return new this.Info(steps as any) as T
  }

  Info = class {
    steps: step[]
    constructor(steps: step[]) {
      this.steps = steps
    }
  }
  canBeBuild(value: unknown) {
    return value instanceof this.Info
  }
  proxy(document: docType) {
    const canBeBuild = (val: unknown) => val instanceof this.Info
    return new DeepProxy(document, {
      get(target, path) {
        // TypeError: Cannot create proxy with a non-object as target or handler
        const ref = Reflect.get(target, path)
        return typeof ref === 'object' && ref !== null ? this.nest(ref) : ref
      },
      set(target, path, value) {
        if (!canBeBuild(value)) return Reflect.set(target, path, value)

        const fullPath = [...this.path, path]

        if (ComponentMatch(fullPath)) {
          return Reflect.set(
            target,
            path,
            buildComponent(
              value.steps as ComponentStep['op'][],
              fullPath,
              this.rootTarget as any
            )
          )
        }

        if (OperationMatch(fullPath)) {
          return Reflect.set(
            target,
            path,
            buildOperation(
              value.steps as OperationStep['op'][],
              fullPath,
              this.rootTarget as any
            )
          )
        }

        throw new Error(
          `building for this path ${fullPath.join(
            '\\'
          )} is not supported currently`
        )
      },
    })
  }
}

// todo: add some way to add custome builders, now Operation aan Component are hardcoded
const openApiBuilder = new _()

export default openApiBuilder

// this is defined in the global scope to be used as `value instanceof Builder`
