/**
 * deletes `$schema` to prevent possible unknown schema type
 * @param {import('json-schema').JSONSchema7} schema
 * @param {boolean} id
 * @returns {import('json-schema').JSONSchema7}
 */
export default function prune(ss, id = false) {
  const newObj = { ...ss }
  delete newObj.$schema
  if (id) delete newObj.$id
  return newObj
}
