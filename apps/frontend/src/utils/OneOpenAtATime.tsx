import { useId } from '@mantine/hooks'
import { createContext, useContext, useEffect, useState } from 'react'
import { WithChildren } from 'ui/src/utils/WithChildren'

const context = createContext<{
  open: false | string
  setOpen: (s: string | false) => void
}>({ open: false, setOpen: () => console.error('no context assigned') })

export const useOneState = (initial?: boolean) => {
  const id = useId()
  const { open, setOpen } = useContext(context)
  const [_open, _setOpen] = useState(open === id)
  useEffect(() => {
    if (initial) setOpen(id)
  }, [initial])
  useEffect(() => {
    if (open === id) _setOpen(true)
    else _setOpen(false)
  }, [open])

  return [
    _open,
    function (arg: boolean | ((old: boolean) => boolean)) {
      if (typeof arg === 'function') {
        const rt = arg(_open)
        return rt ? setOpen(id) : setOpen(false)
      }
      if (arg) setOpen(id)
      else setOpen(false)
    },
  ] as const
}

export const OneStateProvider = ({ children }: WithChildren) => {
  const [open, setOpen] = useState<false | string>(false)
  return (
    <context.Provider value={{ open, setOpen }}>{children}</context.Provider>
  )
}
