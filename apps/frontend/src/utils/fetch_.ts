export default async function fetch_<R>(
  id: string,
  init?: Parameters<typeof fetch>[1],
) {
  const res = await fetch(import.meta.env.VITE_BACKEND_API + id, {
    ...init,
    headers: { ...init?.headers },
  })

  const status = res.status

  const { data, error } = await res.json()

  if (error) return Promise.reject(error)

  return data as R
}
