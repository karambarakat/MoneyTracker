export interface CustomHttpErrorProps {
  status: number
  name: string
  message: string
  details: object
}

export interface CustomError extends Error {
  __details: CustomHttpErrorProps
}
