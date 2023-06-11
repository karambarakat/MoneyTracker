creating new story:

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import 'twin.macro'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './path_to_module'
import { fakerEN } from '@faker-js/faker'

export default {
  title: 'path_to_module',
  component,
  args: {
    children: (fakerEN.seed(1), fakerEN.lorem.paragraph()),
  },
} satisfies _m<typeof component>

export const Primary = {} satisfies _s<typeof component>
```

creating new component:

```ts
import React from 'react'
import { PropsOf } from '@emotion/react'
import ButtonBase from './Button'
import tw from 'twin.macro'

const sizes = {
  sm: tw`w-[18px] h-[18px] min-h-[18px] min-w-[18px] p-[4px]`,
  md: tw`w-[30px] h-[30px] min-h-[30px] min-w-[30px] p-[4px]`,
  lg: tw`w-[44px] h-[44px] min-h-[44px] min-w-[36px] p-[6px]`,
}

const base = tw`flex items-center justify-center`

export default function Button(props: PropsOf<typeof ButtonBase>) {
  return <ButtonBase css={[base, sizes[props.size || 'md']]} {...props} />
}
```

decorators:

```ts
type decorator = _m['decorators'] extends (infer T)[] | undefined ? T : never

const Background: decorator = (Story, context) => {
  const [mode, setMode] = useColorMode()
  return (
    <div className={c('hi', 'border-l-yellow-200')}>
      <Story />
    </div>
  )
}
```
