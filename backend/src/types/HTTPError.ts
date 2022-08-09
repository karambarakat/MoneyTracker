export interface CustomErrorProps {
  status: number
  name: string
  message: string
  details: object
}

export interface CustomError extends Error {
  customError: CustomErrorProps
}
