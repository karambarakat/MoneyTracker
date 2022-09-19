import {
  Box,
  BoxProps,
  createStyles,
  MantineColor,
  MantineGradient,
  MantineNumberSize,
  Text,
  ThemeIcon,
  ThemeIconProps,
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

function _Icon({ icon }: { icon?: string }) {
  const IconName = icon && icon in allTablerIcon ? icon : 'Category2'
  // @ts-ignore
  const IconComponent = allTablerIcon[IconName]
  return <IconComponent />
}

const useHov = createStyles<
  'Parent' | 'Child',
  { color?: string; on?: boolean } | null
>((th, props, getRef) => {
  const i = props?.on ? 7 : 1
  const bg =
    (props?.color && th.colors?.[props.color]?.[i]) || th.colors.gray[i]

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

interface CatInterface {
  title?: string
  color?: string
  icon?: string
}

type _ThemeIconProps = Pick<
  ThemeIconProps,
  'size' | 'radius' | 'color' | 'gradient'
> & { variant?: ThemeIconProps['variant'] | 'subtle' }

interface CategoryIconInterface extends Omit<_ThemeIconProps, 'children'> {
  on?: boolean
  cat?: Omit<CatInterface, 'title'>
}

function CategoryIcon({
  cat = { icon: undefined, color: undefined },
  on,
  ...props
}: CategoryIconInterface) {
  const color = React.useMemo(
    () =>
      cat?.color && allColors.some((c) => c === cat.color)
        ? cat?.color
        : 'gray',
    [cat?.color]
  )

  const styles = useHov({ color, on })

  return (
    <ThemeIcon
      radius={'xl'}
      size={48}
      color={color}
      // @ts-ignore
      variant={on ? 'filled' : 'light'}
      {...props}
      className={styles.classes.Child}
    >
      <_Icon icon={cat?.icon} />
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
}: PropsWithChildren<Pick<CatInterface, 'title'>>) {
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
      <Text sx={{ wordBreak: 'break-word', textAlign: 'center' }}>
        {title || 'Not Categorized'}
      </Text>
    </Box>
  )
}

/**
 *  collections
 */

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
