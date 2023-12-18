import { it, expect } from '@jest/globals'
import fetch from 'node-fetch'

interface useCB<Data = unknown> {
  (passData: Data): Promise<void>
}

interface Extension {
  (dependencies: null, use: useCB): Promise<void>
}

interface Test {
  (id: string, actualTest: (fixtures: Record<string, any>) => Promise<void>)
}

class AsyncEvent<events extends string = string> {
  _target: EventTarget
  constructor() {
    this._target = new EventTarget()
  }

  wait(event: events) {
    return new Promise(res => {
      this._target.addEventListener(event, () => res(null))
    })
  }

  fire(event: events) {
    this._target.dispatchEvent(new Event(event))
  }
}

export default function extend<fixtures extends Record<string, any>>(
  exts: Record<string, Extension>,
): Test {
  return function (id, actualTest: (fixtures: fixtures) => Promise<void>) {
    const deps: any = {}
    const event = new AsyncEvent<'test' | 'buildup'>()

    async function use(key, value) {
      deps[key] = value

      if (Object.keys(deps).length === Object.keys(exts).length) {
        event.fire('buildup')
      }

      await event.wait('test')
    }

    const fixtures = Object.entries(exts).map(([key, value]) => {
      return value(null, grap => use(key, grap))
    })

    it(id, async () => {
      //   await event.wait("buildup");
      await new Promise(res => setTimeout(res, 2000))

      await actualTest(deps)

      event.fire('test')
      await Promise.all(fixtures)
    })
  }
}
