creating new story:

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import 'twin.macro'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { Provider as component } from './path_to_module'
import { fakerEN } from '@faker-js/faker'

export default {
  title: 'path_to_module',
  component,
  args: {
    children: (fakerEN.seed(1), fakerEN.lorem.paragraph())
  }
} satisfies _m<typeof component>

export const Primary = {} satisfies _s<typeof component>
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
