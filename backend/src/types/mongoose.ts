export interface mongoosePathValidationError extends Error {
    properties: any
    kind: string
    path: string
    value: any
    reason: any
}

export interface mongooseValidationError extends Error {
    errors: {
        [key: string]: mongoosePathValidationError
    }
    _message: string
}

export interface myValidationError extends Error {
    errors: {
        [key: string]: string
    }
}