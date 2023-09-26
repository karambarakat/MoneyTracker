import 'twin.macro'
import { useField } from 'formik'
import { defaultValue, useIcon } from './fetch'

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
  icon,
  color,
  ...p
}: {
  icon?: string
  color?: colorNames
}) {
  const icon_ = icon || defaultValue
  const color_ = color || colors.find(e => e.name === color) || 'Grey'
  return (
    <svg
      tw="h-[32px] cursor-pointer"
      css={{
        fill: colors.find(e => e.name === color_)?.color,
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      {...p}
    >
      <path d={icon_}></path>
    </svg>
  )
}

export function CategoryIcon({
  icon,
  color,
  ...p
}: {
  icon: string
  color: colorNames
}) {
  const res = useIcon(icon)

  if (res instanceof Error || res.status === 'error') {
    return <CategoryIconSVG {...p} />
  }

  if (res.status === 'loading') {
    return <CategoryIconSVG tw="animate-pulse duration-100" {...p} />
  }

  return <CategoryIconSVG color={color} icon={res.data} {...p} />
}

export function CategoryIconFromForm({
  names,
  ...p
}: {
  names: { icon: string; color: string }
}) {
  const icon: string | undefined = useField(names.icon)[1].value
  const color: colorNames | undefined = useField(names.color)[1].value

  if (!icon || !color) {
    return <CategoryIconSVG />
  }

  return <CategoryIcon color={color} icon={icon} {...p} />
}
