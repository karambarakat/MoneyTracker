import { colors } from '../utils/tw'
import { color } from '../utils/tw-helper'
import { useMemo } from 'react'
import 'twin.macro'
import tw, { css } from 'twin.macro'
import { fontSizes } from './Text'

interface Props {
  color?: color
  variant?: 'filled' | 'light' | 'outline' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

function Button({
  color = 'primary',
  variant = 'light',
  size = 'md',
  disabled: _disabled = false,
  ...props
}: JSX.IntrinsicElements['button'] & Props) {
  const variantCss = useMemo(() => {
    switch (variant) {
      case 'subtle':
        return subtle(color)
      case 'filled':
        return filled(color)
      case 'light':
        return light(color)
      case 'outline':
        return outline(color)
    }
  }, [variant, color])
  return (
    <button
      {...props}
      disabled={_disabled}
      css={[
        base,
        variantCss,
        sizes[size],
        fontSizes[size],
        _disabled && disabled,
      ]}
    />
  )
}

// syntax I wish I could use:
// twx`
//  bg-transparent text-$color-700 hover:bg-$color-50
//  dark:(text-$color-200 hover:bg-$color-500/40)
// `
const subtle = (c: color) => css`
  background-color: transparent;
  color: ${colors[c][700]};

  &:enabled:hover {
    background-color: ${colors[c][50]};
  }

  .dark & {
    color: ${colors[c][200]};
  }

  .dark &:enabled:hover {
    background-color: ${colors[c][500] + '40'};
  }
`

const filled = (c: color) => css`
  background-color: ${colors[c][600]};
  color: ${colors[c][50]};

  &:enabled:hover {
    background-color: ${colors[c][700]};
  }

  .dark &:enabled:hover {
    background-color: ${colors[c][700]};
  }
`

const light = (c: color) => css`
  color: ${colors[c][900]};
  background-color: ${colors[c][100]};

  &:enabled:hover {
    background-color: ${colors[c][200]};
  }

  .dark & {
    color: ${colors[c][100]};
    background-color: ${colors[c][200] + '20'};
  }

  .dark &:enabled:hover {
    background-color: ${colors[c][100] + '30'};
  }
`

const outline = (c: color) => css`
  ${tw`bg-transparent outline outline-1 -outline-offset-1`};
  outline-style: solid;
  outline-width: 1px;
  outline-color: ${colors[c][700]};
  color: ${colors[c][700]};

  &:enabled:hover {
    background-color: ${colors[c][100]};
  }

  .dark & {
    color: ${colors[c][400]};
    outline-color: ${colors[c][400]};
  }

  .dark &:enabled:hover {
    background-color: ${colors[c][50] + '10'};
  }
`

const base = tw`rounded-md active:translate-y-[1px] font-medium`

const sizes = {
  sm: tw`px-[0.5rem] py-[0.20rem]`,
  md: tw`px-[0.75rem] py-[0.375rem]`,
  lg: tw`px-[1rem] py-[0.5rem]`,
}

// x * 16 = 19, x = 1.1875

const disabled = css`
  cursor: normal;
  opacity: 0.5;
  pointer-events: none;
  transform: none !important;
`

export default Button
