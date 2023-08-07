import { MswParameters } from 'msw-storybook-addon'
import { StoryObj, Meta as Meta_ } from '@storybook/react'

declare global {
  namespace SB {
    export type Meta<C extends (P: any) => JSX.Element> = Omit<
      Meta_<C>,
      'parameters' | 'tags'
    > & {
      parameters?: Parameter
      tags?: Tags[]
    }

    export type Story<C extends (P: any) => JSX.Element> = Omit<
      StoryObj<C>,
      'parameters' | 'tags'
    > & {
      parameters?: Parameter
      tags?: Tags[]
    }

    type Tags = 'autodocs'

    export interface Parameter {
      layout?: 'fullscreen' | 'centered'
      form?: Form
      page?: Page
      msw?: MswParameters['msw']
    }

    interface Form {
      values?: object
      validate?: (values: object) => object
      asField?: {
        name?: string
        value?: unknown
        failed?: true
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Page {}
  }
}
