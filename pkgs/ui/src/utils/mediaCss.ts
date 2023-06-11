import { css } from 'twin.macro'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function media(query: string, tw: any) {
  return css`
    @media ${query} {
      ${tw}
    }
  `
}
