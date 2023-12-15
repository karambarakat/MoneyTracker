import { useMediaQuery } from '@mantine/hooks'

export default function usePreferReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
