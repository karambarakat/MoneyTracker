import { store } from '@src/redux/index'
import { MetaState, RootState } from '@src/redux/types'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

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
