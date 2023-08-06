import tw, { styled } from 'twin.macro'

// width is 12px less than the breakpoint
const Container__Idle = styled.main`
  ${tw`
    mx-auto 
    px-3 sm:px-4 md:px-5 lg:px-6
    w-[95%] sm:w-[628px] md:w-[756px] lg:w-[1012px]
  `}
`

export default Container__Idle
