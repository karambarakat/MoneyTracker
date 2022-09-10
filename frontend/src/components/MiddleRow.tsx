import { Box } from '@mantine/core'
import { useResizeObserver } from '@mantine/hooks'
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react'
import type { Dispatch, SetStateAction } from 'react'

interface IContext {
  elems: ReactNode[]
  middle: ReactNode
}

const initialValues: IContext = {
  elems: [],
  middle: null,
}

const context = createContext<Dispatch<SetStateAction<Partial<IContext>>>>(
  () => {}
)

function MiddleRow({
  children: callUseEffects,
  index,
}: PropsWithChildren<{ index: number }>) {
  const [ref, rect] = useResizeObserver()
  const [cols, setCols] = React.useState(0)
  React.useEffect(() => {
    const newCols = Math.floor(rect.width / 96)
    newCols !== cols && setCols(newCols)
  }, [rect.width])

  const _c = useRef<IContext>(initialValues)
  const [children, setContext] = React.useState<IContext>(initialValues)

  const otherHalf = React.useMemo(() => {
    return children.elems.slice(Math.ceil(index / cols) * cols)
  }, [children.elems, cols, index])

  return (
    <context.Provider
      value={(arg) => setContext((_c.current = { ..._c.current, ...arg }))}
    >
      <div ref={ref}>
        {callUseEffects}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
            justifyItems: 'center',
          }}
        >
          {children.elems.slice(0, Math.ceil(index / cols) * cols)}
        </Box>
        {children.middle}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
            justifyItems: 'center',
          }}
        >
          {otherHalf}
        </Box>
      </div>
    </context.Provider>
  )
}

function Elems({ children }: { children: IContext['elems'] }) {
  const setContext = useContext(context)
  useEffect(() => {
    setContext({ elems: children })
  }, [children])

  return null
}
function Middle({ children }: { children: IContext['middle'] }) {
  const setContext = useContext(context)
  useEffect(() => {
    setContext({ middle: children })
  }, [children])

  return null
}

export default Object.assign(MiddleRow, { Elems, Middle })
