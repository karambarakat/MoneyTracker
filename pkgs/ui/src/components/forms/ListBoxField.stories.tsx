import { PropsOf } from '@emotion/react'
import ListBoxField, { SubComponent } from './ListBoxField'
import { useFieldContext } from './_Field'
import tw from 'twin.macro'
import { AiFillCheckCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const Basic: SubComponent = e => {
  const ctx = useFieldContext()
  return (
    <div
      css={[
        tw`flex gap-2 items-center`,
        e.value === ctx.meta.value && tw`font-extrabold`,
      ]}
    >
      {e.value === ctx.meta.value ? (
        <AiFillCheckCircle />
      ) : (
        <AiOutlineMinusCircle />
      )}
      <span>{e.label}</span>
    </div>
  )
}

function Component(props: {
  consumer: SubComponent
  data: PropsOf<SubComponent>[]
}) {
  return (
    <ListBoxField
      name="ex"
      Children={props.data.map(e => {
        return {
          Component: props.consumer,
          ...e,
        }
      })}
    />
  )
}

export default {
  title: 'Forms/ListBoxField',
  component: Component,
  parameters: {
    form: {
      asField: {
        name: 'multi_select',
      },
    },
  },
  args: {
    consumer: Basic,
    data: [
      { label: 'First_Elem', value: 1 },
      { label: 'Second_Elem', value: 2 },
      { label: 'Third_Elem', value: 3 },
      { label: 'Fourth_Elem', value: 4 },
      { label: 'Fifth_Elem', value: 5 },
    ],
  },
} satisfies SB.Meta<typeof Component>

export const Base = {
  parameters: {
    form: {
      values: {
        ex: 'First_Elem',
      },
      asField: {
        value: 'First_Elem',
      },
    },
  },
} satisfies SB.Story<typeof Component>

export const Selected = {
  play: async ({ canvasElement }) => {
    const elem = within(canvasElement)
    const first = await elem.findByLabelText('First_Elem')
    await expect(first.getAttribute('aria-selected')).toBe('false')
    await first.click()
    await expect(first.getAttribute('aria-selected')).toBe('true')
    const second = await elem.findByLabelText('Second_Elem')
    await second.click()
    await expect(first.getAttribute('aria-selected')).toBe('false')
    await expect(second.getAttribute('aria-selected')).toBe('true')
  },
} satisfies SB.Story<typeof Component>
