creating new story:

```ts
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { Provider as component } from './provider'

export default {
  title: 'to/dir/index.stories.tsx',
  component
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
