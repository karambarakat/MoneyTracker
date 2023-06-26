/// <reference types="node" />
import { readFileSync, writeFileSync } from 'fs'

async function main() {
  const input = readFileSync('./dist/ts/httpErrors.ts').toString()
  const regex = input.matchAll(/export interface ([a-zA-Z_]*) \{/g)
  const allExports = Array.from(regex).map(arr => arr[1])

  const output = `
import { ${allExports.map(e => `\n  ${e},`).join('')}
} from '../ts/httpErrors'

export type All_Errors = ${allExports.map(n => `\n  | ${n}`).join('')}

export type HttpErrorProps = {
  status: number
  name: string
  message: string
  details: object | null
}

export default class HttpError extends Error {
  status: HttpErrorProps['status']
  message: HttpErrorProps['message']
  details: HttpErrorProps['details']
  name: HttpErrorProps['name']
  /**
   * helpful when type narrowing
   */
  payload: All_Errors

  constructor(payload: HttpErrorProps) {
    super('HttpError')
    
    this.status = payload.status
    this.message = payload.message
    this.details = payload.details
    this.name = payload.name
    this.payload = payload as All_Errors
  }
}
    `

  writeFileSync('./dist/helpers/httpErrors.ts', output)
  console.log('build: file written ./dist/helpers/httpErrors.ts')
}

main()
