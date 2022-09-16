import {
  Box,
  BoxProps,
  createStyles,
  MantineColor,
  MantineGradient,
  MantineNumberSize,
  Text,
  ThemeIcon,
  ThemeIconVariant,
} from '@mantine/core'
import { IconProps } from 'tabler-icons-react'
import * as allTablerIcon from './CategoryAllIcons'
import allColors from './CategoryAllColors'
import { CategoriesState, CategoryDoc, RootState } from '@redux/types'
import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import category_find from '@redux/api/category_find'
import CategoryAllColors from './CategoryAllColors'
import * as AllIcons from '@components/category/CategoryAllIcons'
import { boolean } from 'yup'

function Icon({ icon }: { icon?: string }) {
  const IconName = icon && icon in allTablerIcon ? icon : 'Category2'
  // @ts-ignore
  const IconComponent = allTablerIcon[IconName]
  return <IconComponent />
}

interface NativeIconProps {
  /** Predefined width and height or number for width and height in px */
  size?: MantineNumberSize
  /** Predefined border-radius from theme.radius or number for border-radius in px */
  radius?: MantineNumberSize
  /** Icon color from theme */
  color?: MantineColor
  /** Controls appearance */
  variant?: ThemeIconVariant | 'subtle'
  /** Controls gradient settings in gradient variant only */
  gradient?: MantineGradient
}

interface CategoryIconInterface extends NativeIconProps {
  on?: boolean
  cat: Partial<CategoryDoc>
}

const useHov = createStyles<
  'Parent' | 'Child',
  { color?: string; on?: boolean } | null
>((th, _p, getRef) => {
  const i = _p?.on ? 7 : 1
  const bg =
    (_p?.color && th.colors?.[_p.color] && th.colors[_p.color][i]) ||
    th.colors.gray[i]

  return {
    Parent: {
      ref: getRef('Parent'),
      cursor: 'pointer',
      '&:active': { transform: 'translateY(1px)' },
    },
    Child: {
      [`.${getRef('Parent')}:hover &`]: {
        backgroundColor: bg,
      },
    },
  }
})

/**
 * Outers
 */

function CategoryIcon({
  cat,
  on,
  ...props
}: CategoryIconInterface & { on: boolean }) {
  const color = (
    cat.color && allColors.some((c) => c === cat.color) ? cat.color : 'gray'
  ) as string

  const styles = useHov({ color, on })
  return (
    // @ts-ignore
    <ThemeIcon
      radius={'xl'}
      size={48}
      color={color}
      // @ts-ignore
      variant={on ? 'filled' : 'light'}
      className={styles.classes.Child}
      {...props}
    >
      <Icon icon={cat.icon} />
    </ThemeIcon>
  )
}

CategoryIcon.Hoverable = function ({
  children,
  ...props
}: PropsWithChildren<BoxProps>) {
  const styles = useHov(null)

  return (
    <Box className={styles.classes.Parent} {...props}>
      {children}
    </Box>
  )
}

CategoryIcon.WithTitle = function ({
  children,
  title,
}: PropsWithChildren<Pick<CategoryDoc, 'title'>>) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {children}
      <Text sx={{ wordBreak: 'break-word', textAlign: 'center' }}>{title}</Text>
    </Box>
  )
}

const collectionAllCategories = () => {
  const cats = useSelector<RootState, CategoriesState>((s) => s.categories)
  React.useEffect(() => {
    category_find()
  }, [])
  return cats
}

const collectionAllColors = CategoryAllColors

const collectionAllIcons = () => {
  return Object.keys(AllIcons).map((key) => {
    // @ts-ignore
    const Icon: React.FC<IconProps> = AllIcons[key]
    return { Icon, key }
  })
}

CategoryIcon.collection = {
  useAllCats: collectionAllCategories,
  allColors: collectionAllColors,
  allIcons: collectionAllIcons(),
}

export default CategoryIcon
