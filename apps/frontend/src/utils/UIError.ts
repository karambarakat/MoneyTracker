export default class UIError extends Error {
  jsError: unknown
  constructor(message: string, jsError?: unknown) {
    super(message)
    this.jsError = jsError
  }
}
