
export type Operation = import('openapi-types').OpenAPIV3.OperationObject
export type Document = import('openapi-types').OpenAPIV3.Document
type oapi_c = Required<import('openapi-types').OpenAPIV3.ComponentsObject>

/**
 * todo: to be implemented
 * this is supposed to be extendable declaration based component
 * declaration-based is suppose help in scenarios like: { type: 'delete' } and { type: 'fetch' } can fire an error because both define a 200 response
 * extendable is suppose to add functionality simply by adding keys like: { type: 'fetch', example: [{...}] } which will fire the fetch component and add the example to the response
 */
type PlainComponent = { type: string }

export type actions = {
  addComponent<T>(cb: ((data: Required<oapi_c>) => T), add: T): { $ref: string } | undefined
}

export type Component =
  | ((data: Operation) => void)
  | ((data: Operation, actions: actions) => void)
  | PlainComponent

/**
 * this component is supposed to be be transformed by some function
 */
export type RawComponent<Options = unknown> =
  unknown extends Options ?
  ((ctx: { data: Operation, actions: actions }) => void)
  :
  ((ctx: { data: Operation, actions: actions }, option: Options) => void)
