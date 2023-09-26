import { MswParameters } from 'msw-storybook-addon'
import { StoryObj, Meta as OrgMeta } from '@storybook/react'
import { ReactRouterAddonStoryParameters } from 'storybook-addon-react-router-v6'
import { Decorator as OrgDecorator } from '@storybook/react'
import type { A11yParameters } from '@storybook/addon-a11y'

export interface ExpParameter {
  layout?: 'fullscreen' | 'centered'
  form?: {
    values?: object
    validate?: (values: object) => object
    asField?: {
      name?: string
      value?: unknown
      failed?: true
    }
  }
  query?: boolean
  msw?: MswParameters['msw']
  mode?: 'dark' | 'light'
  reactRouter?: ReactRouterAddonStoryParameters
  a11y?: A11yParameters['config']
}

export type ExpTags = 'autodocs'

export type ExpDecorator = (
  S: () => JSX.Element,
  ctx: { parameters?: ExpParameter; tags?: ExpTags[] },
) => JSX.Element

declare global {
  namespace SB {
    export type Decorator = ExpDecorator

    export type Parameter = ExpParameter

    export type Meta<C extends (P: any) => JSX.Element> = Omit<
      OrgMeta<C>,
      'parameters' | 'tags'
    > & {
      parameters?: ExpParameter
      tags?: ExpTags[]
    }

    export type Story<C extends (P: any) => JSX.Element> = Omit<
      StoryObj<C>,
      'parameters' | 'tags'
    > & {
      parameters?: ExpParameter
      tags?: ExpTags[]
    }

    export type Tags = ExpTags
  }
}
