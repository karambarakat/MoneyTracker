interface Error {
  status: number
  message: string
  name: string
  details: { errors?: { [key: string]: string } }
}

export default function throwHttpError(data: Error) {
  const e = new Error(data.message as string)
  //@ts-ignore
  e.errors = data.details?.errors
  throw e
}
