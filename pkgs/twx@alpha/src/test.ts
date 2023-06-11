import twx from './index'

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

test('twx', () => {
  const base = _twx`
 bg-transparent text-color-700 hover:bg-color-50
 dark:(text-color-200 hover:bg-color-500/40)
`

  expect(base).toEqual({
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
  })
})
