import { MswParameters } from 'msw-storybook-addon'
import { StoryObj, Meta as Meta_ } from '@storybook/react'
import { ReactRouterAddonStoryParameters } from 'storybook-addon-react-router-v6'
import {
  Parameter as _Parameter,
  Tags as _Tags,
  Decorator as _Decorator,
} from 'ui/types/SB'

declare global {
  namespace SB {
    export type Decorator = _Decorator

    export type Meta<C extends (P: any) => JSX.Element> = Omit<
      Meta_<C>,
      'parameters' | 'tags'
    > & {
      parameters?: _Parameter
      tags?: _Tags[]
    }

    export type Story<C extends (P: any) => JSX.Element> = Omit<
      StoryObj<C>,
      'parameters' | 'tags'
    > & {
      parameters?: _Parameter
      tags?: _Tags[]
    }
  }
}
