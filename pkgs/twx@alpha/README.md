# TWX

this package is initial designed to extends css-in-js library like `twin.macro` and `@motion/css`

## The Syntax I Want

```ts
import twx from 'twx'

const unique = Math.random().toString(36).slice(2, 8) // let say it's 'fc2b3a'

const _twx = twx([
  {
    type: 'colors',
    key: 'color',
    value: {
      50: '#0cccccc',
      100: '#199999',
      200: '#333333',
      300: '#4c4c4c',
      400: '#666666',
      500: '#7f7f7f',
      600: '#999999',
      700: '#b2b2b2',
      800: '#cccccc',
      900: '#e5e5e5',
      950: '#f2f2f2',
    },
  },
  {
    type: 'group',
    key: 'dark',
    className: 'dark-' + unique,
  },
  {
    type: 'group',
    key: 'light',
    className: 'light-' + unique,
  },
])

const base = _twx`
 bg-transparent text-color-700 hover:bg-color-50
 dark:(text-color-200 hover:bg-color-500/40)
`

// result:
/**
base = {
  backgroundColor: 'transparent',
  color: 'rgb(178, 178, 178)',
  '&:hover': {
    backgroundColor: 'rgb(204, 204, 204)',
  },
  '.dark-fc2b3a &': {
    color: 'rgb(51, 51, 51)',
    '&:hover': {
      backgroundColor: 'rgba(51, 51, 51, 0.4)',
    },
  },
}
*/
```

I Imagine even better syntax can be achieved:

```tsx
import twx from 'twx'

export default MyButton({ disabled }) //{
return (
  <button twx-group={[disabled && 'disabled-xx']}>
    <div
      twx={`
        bg-transparent text-slate-700 hover:bg-slate-50
        flex--center center--
        dark:(text-slate-200 hover:bg-slate-500/40) 
        disabled-xx:text-slate-700/50 disabled-xx:bg-slate-50/50
      `}
    >
      Click Me
    </div>
  </button>
)
//}
```
