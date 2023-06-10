import tw, { styled } from 'twin.macro'

interface Props {
  width?: number
}

const TextEllipsis = styled.div<Props>`
  ${({ width }) => width && `width:${width}px`};
  ${tw`text-ellipsis whitespace-nowrap overflow-hidden`};
`

export default TextEllipsis
