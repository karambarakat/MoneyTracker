import { MantineColor } from '@mantine/styles'

// warning: when adding aditional color TypeScript will not throw an error
// because MantineColor has `| string & {}` portion
// but that color will not work in practice
const CategoryAllColors: MantineColor[] = [
  'dark',
  'gray',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'green',
  'lime',
  'yellow',
  'orange',
  'teal',
]

export default CategoryAllColors
