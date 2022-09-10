import { ActionIcon, ThemeIcon, useMantineTheme } from '@mantine/core'
import React from 'react'
import CategoryTabler from './CategoryTabler'

const colors = [
  'dark',
  'gray',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
]

interface CategoryIconInterface {
  on?: boolean
  hover: boolean
  cat: { color?: string; icon?: string }
}

function CategoryIcon({ cat, on, hover }: CategoryIconInterface) {
  const color = (
    cat.color && colors.some((c) => c === cat.color) ? cat.color : 'gray'
  ) as string
  const { colors: mc } = useMantineTheme()
  return (
    <ThemeIcon
      style={hover ? { backgroundColor: mc[color][on ? 7 : 1] } : {}}
      radius={'xl'}
      p="xs"
      size={48}
      color={color}
      variant={on ? 'filled' : 'light'}
    >
      <CategoryTabler icon={cat.icon} />
    </ThemeIcon>
  )
}

export default CategoryIcon
