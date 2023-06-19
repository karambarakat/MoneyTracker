import { Theme } from '@emotion/react'
import { StyledComponent } from '@emotion/styled'
import { DetailedHTMLProps, ElementType, HTMLAttributes } from 'react'

export type acceptStyled =
  | ((p: unknown) => JSX.Element)
  | StyledComponent<
      { theme?: Theme | undefined; as?: ElementType<any> | undefined },
      DetailedHTMLProps<HTMLAttributes<any>, any>,
      Record<string, any>
    >

// const test1: divStyle = () => <div>hi</div>
// const test2: divStyle = styled.div``
