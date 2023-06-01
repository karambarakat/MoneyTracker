// this is a wrapper around `@apidevtools/json-schema-ref-parser` bundle function
import parser from '@apidevtools/json-schema-ref-parser'
import type { FileInfo } from '@apidevtools/json-schema-ref-parser/dist/lib/types'

type get$ids<T> = T extends { $id: infer I }[] ? I : never

export default async function deref<
  S extends { $id: string }[],
  H extends get$ids<S>
>(schema: S, href: H) {
  return (await parser.bundle(href, {
    resolve: {
      http: false,
      file: false,
      mySchema: {
        canRead: /$/i,
        order: 1,
        read: read.bind({ schema }),
      },
    },
  })) as Select<H, S>
}

type Select<Href, Schemas> = Schemas extends Array<infer Selected>
  ? Selected extends { $id: Href }
    ? Selected
    : never
  : never

function read(
  info: FileInfo,
  cb: (e: Error | null, d: unknown | null) => void
) {
  const _schema = this.schema.find((e) => e.$id === info.url)
  if (!_schema) {
    //if error
    cb(new Error(`getSchema: schema with id:${info.url} doesn't exist`), null)
    return
  }

  cb(null, this.schema)
}
