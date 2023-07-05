import { store } from '@redux/index'
import { MetaState, ActionsObjects, RootState } from '@redux/types'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useOutlet } from 'react-router-dom'

type contextType = [string, React.Dispatch<React.SetStateAction<string>>]

// eslint-disable-next-line @typescript-eslint/no-empty-function
const context = createContext<contextType>(['', () => {}])

function Page() {
  const state = useState('Home')
  return (
    <context.Provider value={state}>
      <Outlet />
    </context.Provider>
  )
}

export const title = Symbol('title')

export function getTitle() {
  const [c] = useContext(context)
  const s = useSelector<RootState, MetaState>(s => s.meta).title

  const title = c || s

  return title
}

export function setTitle(title: string) {
  const [_, set] = useContext(context)
  useEffect(() => {
    store.dispatch({ type: 'META_SET_TITLE', pl: { title } })
    set(title)
  }, [])
}

export default Page
