import icons from './icons'
import { rest } from 'msw'
import * as c from './CategoryIcon'
import 'twin.macro'
import { within } from '@storybook/testing-library'
import { useQueryClient } from '@tanstack/react-query'
import { FormInterface } from 'ui/src/components/forms/_Form'
import tw from 'twin.macro'

export default {
  title: 'category_utils/Icon',
  component: c.CategoryIconSVG,
  decorators: [
    Story => {
      const client = useQueryClient()
      client.setQueryData(['icons'], icons.split('\n'))

      return <Story />
    },
  ],
} satisfies SB.Meta<typeof c.CategoryIconSVG>

export const SvgDefault = {
  render: p => <c.CategoryIconSVG {...p} />,
} satisfies SB.Story<typeof c.CategoryIconSVG>

export const SvgCustom = {
  args: {
    color: 'Magenta',
    path: icons.split('\n')[3],
  },
} satisfies SB.Story<typeof c.CategoryIconSVG>

export const Loading = {
  // I cant mimic this with MSW right the rest endpoint has to be external
  render: p => <c.CategoryIconSVGLoading {...p} />,
} satisfies SB.Story<typeof c.CategoryIconSVG>

export const InForm = {
  render: p => (
    <Form
      action={async vals => console.log(vals)}
      values={{ categoryIcon: { icon: '5', color: 'Blue' } }}
    >
      <c.CategoryIconFromForm
        {...p}
        names={{ color: 'categoryIcon.color', icon: 'categoryIcon.icon' }}
      />
    </Form>
  ),
} satisfies SB.Story<typeof c.CategoryIconFromForm>

export const CustomIcon = {
  render: p => (
    <Form
      action={async vals => console.log(vals)}
      values={{ categoryIcon: { icon: '5', color: 'Gray' } }}
    >
      <c.CategoryIconFromForm
        {...p}
        tw="bg-primary-600"
        names={{ color: 'categoryIcon.color', icon: 'categoryIcon.icon' }}
      />
    </Form>
  ),
} satisfies SB.Story<typeof c.CategoryIconFromForm>
