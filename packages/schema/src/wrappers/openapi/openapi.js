/// <reference path="./_.ts" />
// @ts-check

/**
 * @type {import('openapi-types').OpenAPIV3.ComponentsObject}
 */
export var oapi_comp = {
  schemas: {},
  responses: {},
  parameters: {},
  examples: {},
  requestBodies: {},
  headers: {},
  securitySchemes: {},
  links: {},
  callbacks: {},
}

/**
 * @type {import('./_').actions['addComponent']}
 */
function addComponent(cb, add) {
  var key
  var key2
  try {
    // @ts-ignore
    cb(undefined)
  } catch (error) {
    const msg = error.message
    const match = msg.match(/'[a-zA-Z0-9_]+'/)
    if (!match) throw error('openapi: unexpected error')
    key = match[0].slice(1, -1)
    try {
      // @ts-ignore
      cb({ [key]: undefined })
    } catch (error) {
      const msg = error.message
      const match = msg.match(/'[a-zA-Z0-9_]+'/)
      if (!match) throw error('openapi: unexpected error')
      key2 = match[0].slice(1, -1)
      oapi_comp[key][key2] = add
      try {
        // @ts-ignore
        cb({ [key]: { [key2]: undefined } })
        return { $ref: `#/components/${key}/${key2}` }
      } catch (error) {}
    }
  }

  return
}

/**
 * @param {import('./_').Component[]} components
 * @returns {import('./_').Operation}
 */
export default function openApiOperation(...components) {
  const Base = { responses: {} }

  components?.forEach((component) => {
    if (typeof component === 'function') {
      // @ts-ignore
      if (component.length === 1) return component(Base)
      if (component.length === 2)
        return component(Base, {
          addComponent,
        })
    }

    // todo: to be implemented
    if ('type' in component) throw new Error('openapi: to be implemented')

    // type isNever = typeof component // never
    throw new Error('openapi: invalid component')
  })

  return Base
}
