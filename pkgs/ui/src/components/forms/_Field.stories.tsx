import React from 'react'
import 'twin.macro'
import {
  CancelFieldValue,
  FieldBase,
  FieldError,
  FieldInfo,
  FieldRoot,
  Input,
  Title,
} from './_Field'

export default {
  title: 'forms/Field',
} satisfies SB.Meta<any>

export const Basic = {
  parameters: {
    form: {
      asField: {},
    },
  },
  decorators: [
    Story => {
      return <Story args={{ name: 'StoryField' }} />
    },
  ],
  render: (args, ctx) => {
    return (
      <FieldRoot {...args}>
        <FieldBase>
          {/* <div tw="flex gap-3 items-center"> */}
          {/* <div tw="flex-1"> */}
          <Title />
          <Input />
          {/* </div> */}
          {/* <CancelFieldValue /> */}
          {/* </div> */}
        </FieldBase>
        <FieldError />
        {/* <FieldInfo /> */}
      </FieldRoot>
    )
  },
} satisfies SB.Story<typeof FieldRoot>

export const Filled = {
  parameters: {
    form: {
      asField: {
        value: 'field is filled',
      },
    },
  },
  decorators: Basic.decorators,
  render: Basic.render,
} satisfies SB.Story<typeof FieldRoot>

export const Error = {
  parameters: {
    form: {
      asField: {
        value: 'field is filled',
        failed: true,
      },
    },
  },
  decorators: Basic.decorators,
  render: Basic.render,
} satisfies SB.Story<typeof FieldRoot>

export const WithIcon = {
  parameters: Filled.parameters,
  decorators: Basic.decorators,
  render: (args, ctx) => {
    return (
      <FieldRoot {...args}>
        <FieldBase>
          <div tw="flex gap-3 items-center">
            <div tw="flex-1">
              <Title />
              <Input />
            </div>
            <CancelFieldValue />
          </div>
        </FieldBase>
        <FieldError />
        {/* <FieldInfo /> */}
      </FieldRoot>
    )
  },
} satisfies SB.Story<typeof FieldRoot>

export const WithInfo = {
  parameters: Filled.parameters,
  decorators: Basic.decorators,
  render: (args, ctx) => {
    return (
      <FieldRoot {...args}>
        <FieldBase>
          {/* <div tw="flex gap-3 items-center"> */}
          {/* <div tw="flex-1"> */}
          <Title />
          <Input />
          {/* </div> */}
          {/* <CancelFieldValue /> */}
          {/* </div> */}
        </FieldBase>
        <FieldError />
        <FieldInfo>more info about this field</FieldInfo>
      </FieldRoot>
    )
  },
} satisfies SB.Story<typeof FieldRoot>
