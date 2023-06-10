import { colors as colors_config, spacing } from './tw'

const exec = ['inherit', 'transparent', 'black', 'white'] as const
export type color = typeof colors_config extends Record<infer K, unknown>
  ? Exclude<K, (typeof exec)[number]>
  : never

export const colors = Object.keys(colors_config).filter(
  k => !exec.includes(k as (typeof exec)[number])
) as color[]

/**
 * @alpha
 */
export const pickColor = (
  color: color,
  grade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
  options?: { o?: number; p?: string; s?: string }
) => {
  // @ts-ignore
  let c = colors[color][grade]

  if (!options) return c

  if (options.o) c = c + options.o.toFixed(0).toString()

  if (options.p) c = `${options.p}: ${c};`

  if (options.s) c = `${options.s} { ${c} }`

  return c
}

export type sizeMap<T extends string> = Record<
  T,
  Exclude<keyof typeof spacing, 'px'>
>

/**
 * @alpha
 */
export function pickSize<T extends string>(size: T, map: sizeMap<T>) {
  if (!map[size]) {
    console.error(`size ${size} not found in map`, map)
    return spacing[0]
  }

  return spacing[map[size]]
}

const bp = [640, 768, 1024] as const
/**
 * @alpha
 */
export const screens = {
  sm: `(min-width: ${bp[0]}px)`,
  md: `(min-width: ${bp[1]}px)`,
  lg: `(min-width: ${bp[2]}px)`,
  xs_max: `(max-width: ${bp[0] - 1}px)`,
  sm_max: `(max-width: ${bp[1] - 1}px)`,
  md_max: `(max-width: ${bp[2] - 1}px)`,
  sm_exact: `(min-width: ${bp[0]}px) and (max-width: ${bp[1] - 1}px)`,
  md_exact: `(min-width: ${bp[1]}px) and (max-width: ${bp[2] - 1}px)`
}
