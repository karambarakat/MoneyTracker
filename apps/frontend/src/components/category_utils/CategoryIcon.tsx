import 'twin.macro'
import { useField } from 'formik'
import { defaultValue, useIconSVG as useIconPath } from './fetch'
import { useQuery } from '@tanstack/react-query'
import { find_category } from '../../api/queries'
import { queryKeys } from '../../api'
import { useMemo } from 'react'

export type colorNames = typeof colors extends Readonly<Array<infer I>>
  ? I extends Readonly<Record<'name', infer V>>
    ? V
    : never
  : never

export const colors = [
  { name: 'Grey', color: 'rgb(85, 83, 78)' },
  { name: 'Silver', color: 'rgb(166, 162, 153)' },
  { name: 'Brown', color: 'rgb(159, 107, 83)' },
  { name: 'Gold', color: 'rgb(203, 145, 47)' },
  { name: 'Orange', color: 'rgb(217, 115, 13)' },
  { name: 'Blue', color: 'rgb(51, 126, 169)' },
  { name: 'Purple', color: 'rgb(144, 101, 176)' },
  { name: 'Magenta', color: 'rgb(193, 76, 138)' },
  { name: 'Red', color: 'rgb(212, 76, 71)' },
] as const

export function CategoryIconSVG({
  path,
  color,
  ...p
}: {
  path?: string
  color?: colorNames
}) {
  const icon_ = path || defaultValue
  const color_key = color || colors.find(e => e.name === color) || 'Silver'
  return (
    <svg
      tw="h-[32px]"
      css={{
        fill: colors.find(e => e.name === color_key)?.color,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      {...p}
    >
      <path d={icon_}></path>
    </svg>
  )
}

export function CategoryIconSVGLoading(p: any) {
  return (
    <svg
      tw="h-[32px] animate-pulse duration-100"
      css={{
        fill: colors[1].color,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      {...p}
    >
      <path d={defaultValue}></path>
    </svg>
  )
}

export function CategoryIcon({
  icon,
  color,
  ...p
}: {
  icon?: string
  color?: colorNames
}) {
  const res = useIconPath(icon)

  if (res instanceof Error || res.status === 'error') {
    return <CategoryIconSVG {...p} />
  }

  if (res.status === 'loading') {
    return <CategoryIconSVGLoading {...p} />
  }

  return <CategoryIconSVG color={color} path={res.data} {...p} />
}

export function CategoryIconFromForm({
  names,
  ...p
}: {
  names: { icon: string; color: string }
}) {
  const icon: string | undefined = useField(names.icon)[1].value
  const color: colorNames | undefined = useField(names.color)[1].value

  return <CategoryIcon color={color} icon={icon} {...p} />
}

const useOneCategory = (id: string | undefined) => {
  const categories = useQuery({
    queryFn: () => find_category(),
    queryKey: ['find_category'] satisfies queryKeys,
    suspense: false,
  }).data

  const category = useMemo(() => {
    if (!categories) return new Error('categories not found')

    return categories.find(e => e.id === id)
  }, [categories, id])

  return categories ? category : new Error('categories not found')
}

export function CategoryIconFromFormId({ name, ...props }: { name: string }) {
  const id: string | undefined = useField(name)[1].value
  const category = useOneCategory(id)

  if (!id || category instanceof Error || !category)
    return <CategoryIconSVG {...props} />

  return (
    <CategoryIcon
      icon={category.icon as string}
      color={category.color as colorNames}
      {...props}
    />
  )
}

// export function CategoryIconFromId({ id, ...props }: { id?: string }) {
//   const category = useOneCategory(id)

//   if (!id) return <CategoryIconSVG {...props} />

//   if (category instanceof Error) return <CategoryIconSVG {...props} />

//   return category ? (
//     <CategoryIcon
//       icon={category.icon as string}
//       color={category.color as colorNames}
//       {...props}
//     />
//   ) : (
//     <CategoryIconSVG {...props} />
//   )
// }
