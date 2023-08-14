import NodeFetch from 'node-fetch'

export default async function fetch(
  url: string,
  req?: Omit<Parameters<typeof NodeFetch>[1], 'body'> & { json?: object },
) {
  const { json, ...rest } = req || {}
  const body = json ? { body: JSON.stringify(json) } : {}

  const res_ = await NodeFetch('http://localhost:4200/api/v1' + url, {
    ...rest,
    ...body,
  })

  const res = await res_.json()

  return { url, req, res }
}
