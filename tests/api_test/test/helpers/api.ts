import NodeFetch from 'node-fetch'
import { RequestInit } from 'node-fetch'

export default async function api(
  url: string,
  req?: Omit<RequestInit, 'body'> & { json?: object },
) {
  const { json, ...rest } = req || {}
  const body = json ? { body: JSON.stringify(json) } : {}

  const res_ = await NodeFetch('http://localhost:4200/api/v1' + url, {
    ...rest,
    ...body,
  })

  const res = (await res_.json()) as any

  return { url, req, res }
}
