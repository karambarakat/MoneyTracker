import { Callback } from 'json-schema-traverse'

export default function removeReadOnly(
  schema: any,
  jsonPtr: any,
  rootSchema: any,
  parentJsonPtr: any,
  parentKeyword: any,
  parentSchema: any,
  keyIndex: any
): ReturnType<Callback> {
  if (schema.readOnly) {
    if (keyIndex) delete parentSchema[parentKeyword][keyIndex]
    else delete parentSchema[parentKeyword]

    if (parentSchema.type === 'object') {
      if (parentSchema.required) {
        parentSchema.required = parentSchema.required.filter(
          (e) => e !== keyIndex
        )
      }
    }
  }
}
