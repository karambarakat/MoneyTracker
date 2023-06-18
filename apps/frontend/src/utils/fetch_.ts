export default async function fetch_<R>(
  id: string,
  init?: Parameters<typeof fetch>[1],
) {
  const res = await fetch(import.meta.env.VITE_BACKEND_API + id, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhlYzQ2Y2NmOWM2MzcxNjBmMzczNjkiLCJlbWFpbCI6InVzZXJAZy5jIiwiaWF0IjoxNjg3MDc3OTk2LCJleHAiOjE2ODcyNTA3OTZ9.j6ElVd6_iln2DP9MEIW-Efx4SleG50e6Sar6_pXCsgs',
    },
  })

  const { data, error } = await res.json()

  if (error) return Promise.reject(error)

  return data as R
}
