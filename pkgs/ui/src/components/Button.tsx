import { colors } from '@src/utils/tw'
import { color } from '@src/utils/tw-helper'
// import { color } from '@src/utils/tw-helper'
import 'twin.macro'
import tw, { styled } from 'twin.macro'

interface Props {
  color?: color
  variant?: 'filled' | 'light' | 'outline' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const Button = styled.button<Props>`
  ${tw`rounded-md px-4 py-2 active:translate-y-[1px] font-medium`}

  ${({ size = 'md' }) =>
    size === 'sm'
      ? tw`px-2 py-1 text-sm`
      : size === 'md'
      ? ''
      : size === 'lg'
      ? tw`px-5 py-3 text-lg`
      : ''}

  ${({ disabled }) =>
    disabled &&
    `
      cursor: normal;
      opacity: 0.5;
      pointer-events: none;
      transform: none !important;
    `}

  ${({ color = 'primary', variant = 'subtle', disabled }) =>
    variant === 'subtle' &&
    `
      background-color: transparent;
      color: ${colors[color][700]};
      .dark & { color: ${colors[color][100]} };
      ${
        !disabled &&
        `
        &:hover {
          background-color: ${colors[color][50]};
          .dark & { background-color: ${colors[color][700] + 20} };
        }
      `
      }
    `}

  ${({ color = 'primary', variant, disabled }) =>
    variant === 'filled' &&
    `
      background-color: ${colors[color][600]};
      color: ${colors[color][50]};
      ${
        !disabled &&
        `
        &:hover {
          background-color: ${colors[color][700]};
          .dark & { background-color: ${colors[color][700]} };
        }
      `
      }
    `}

  ${({ color = 'primary', variant, disabled }) =>
    variant === 'light' &&
    `
      color: ${colors[color][900]};
      background-color: ${colors[color][50]};
      .dark & { color: ${colors[color][100]} };
      .dark & { background-color: ${colors[color][200] + '20'} };
      ${
        !disabled &&
        `
        &:hover {
          background-color: ${colors[color][100]};
          .dark & { background-color: ${colors[color][100] + '30'} };
        }
      `
      };
    `}

  ${({ color = 'primary', variant, disabled }) =>
    variant === 'outline' &&
    `
      ${tw`bg-transparent outline outline-1`};
      outline-style: solid;
      outline-width: 1px;
      outline-color: ${colors[color][700]};
      color: ${colors[color][700]};
      .dark & { color: ${colors[color][400]} };
      .dark & { outline-color: ${colors[color][400]} };
      ${
        !disabled &&
        `
        &:hover {
          background-color: ${colors[color][100]};
          .dark & { background-color: ${colors[color][50] + '10'};
        }
      `
      };
    `}
`

export default Button
