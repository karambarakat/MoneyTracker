import { GRAPHQL } from './constants'
import fetch from 'node-fetch'

// this is to get apollo to support auto-completion
function gql(literals, ...placeholders) {
  const input = literals.reduce((acc, cur, idx) => {
    return acc + cur + (placeholders[idx] || '')
  }, '') as string
  return { input }
}

gql.profile = 'id email displayName avatar providers createdAt updatedAt'

gql.category = `id title icon color createdAt updatedAt createdBy { ${gql.profile} }`

gql.entry = `id title amount note createdAt updatedAt createdBy { ${gql.profile} } category { ${gql.category} }`

export { gql }

export async function fetchQql<
  Result extends Record<any, any>,
  Variables extends Record<any, any> | undefined = undefined,
>(header: any, query: string, variables?: Variables) {
  const res = await fetch(GRAPHQL, {
    method: 'POST',
    headers: header,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (
    res.status !== 200 ||
    res.headers.get('content-type') !== 'application/json'
  ) {
    console.log({
      status: res.status,
      header: res.headers,
      body: await res.text(),
    })
    throw new Error('bad response')
  }

  const data: any = await res.json()

  if (data.errors || !data.data) {
    console.log({ data })
    throw new Error(data.errors[0].message)
  }

  return data.data as Result
}
