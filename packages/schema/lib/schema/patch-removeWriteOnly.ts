export default function removeWriteOnly(
  schema: any,
  jsonPtr: any,
  rootSchema: any,
  parentJsonPtr: any,
  parentKeyword: any,
  parentSchema: any,
  keyIndex: any
) {
  if (schema.writeOnly) {
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
