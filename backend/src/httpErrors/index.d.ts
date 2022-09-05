declare module httpErrors {
  export interface HttpErrorProps {
    status: number
    name: string
    message: string
    details: object
  }

  export interface HttpError extends Error {
    __details: HttpErrorProps
  }
}
