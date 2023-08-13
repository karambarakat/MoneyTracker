import { MswParameters } from 'msw-storybook-addon'
import { StoryObj, Meta as Meta_ } from '@storybook/react'
import { ReactRouterAddonStoryParameters } from 'storybook-addon-react-router-v6'

export interface Parameter {
  layout?: 'fullscreen' | 'centered'
  form?: Form
  page?: Page
  msw?: MswParameters['msw']
  mode?: 'dark' | 'light'
  reactRouter?: ReactRouterAddonStoryParameters
}

export type Tags = 'autodocs'
export type Decorator = NonNullable<Meta_['decorators']> extends Array<infer T>
  ? T
  : never

declare global {
  namespace SB {
    export type Decorator = Decorator

    export type Parameter = Parameter

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
      parameters?: _Parameter
      tags?: Tags[]
    }

    type Tags = 'autodocs'
  }
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
