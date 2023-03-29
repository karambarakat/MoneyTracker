import { OpenAPIV3 as v3 } from 'openapi-types'

export type ComponentStep = { op: 'test'; doc: v3.ComponentsObject }

export default function buildComponent(
  steps: ComponentStep['op'][],
  path: (string | Symbol | number)[],
  rootDoc: v3.Document
): v3.ComponentsObject {
  console.log('opeanapi builder: to be implemented')
  // steps[0] === 'test'
  return {}
}

export function match(path: (string | number | Symbol)[]) {
  return path[0] === 'components' && path.length === 3
}
