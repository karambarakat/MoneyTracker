import { Box, Stack } from '@mantine/core'
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
)

function MiddleRow({
  children: callUseEffects,
  index,
  minWidth = '96px',
}: PropsWithChildren<{ index: number; minWidth?: string }>) {
  const [ref, rect] = useResizeObserver()
  const [cols, setCols] = React.useState(0)
  React.useEffect(() => {
    const newCols = Math.floor(rect.width / 96)
    newCols !== cols && setCols(newCols)
  }, [rect.width])

  const _c = useRef<IContext>(initialValues)
  const [children, setContext] = React.useState<IContext>(initialValues)

  const newIndex = Math.ceil((index + 1) / cols) * cols

  return (
    <context.Provider
      value={arg => setContext((_c.current = { ..._c.current, ...arg }))}
    >
      <Box
        sx={{
          // gap: '24px',
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
          rowGap: '24px',
          justifyItems: 'center',
          '> *': {
            order: 1,
          },
          '> .cutInHalf, > .cutInHalf ~ *': {
            order: 3,
          },
        }}
        ref={ref}
      >
        <div
          style={{
            order: 2,
            gridColumn: `1 / span ${cols}`,
            justifySelf: 'stretch',
          }}
        >
          {children.middle}
        </div>
        {children.elems.map((elem, index) => (
          <div key={index} className={index === newIndex ? 'cutInHalf' : ''}>
            {elem}
          </div>
        ))}
        {callUseEffects}
      </Box>
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
