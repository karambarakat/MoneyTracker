export default class ErrorDebug extends Error {
  constructor(message: string, ...args: any[]) {
    super(message)
    console.error(message, ...args)
  }
}
