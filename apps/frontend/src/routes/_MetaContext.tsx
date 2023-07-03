import {
  createDefinedContext,
  useDefinedContext,
} from '@src/utils/definedContext'
import React, { useState, useEffect, createContext, useContext } from 'react'
import { WithChildren } from 'ui/src/utils/WithChildren'

type contextType = [string, React.Dispatch<React.SetStateAction<string>>]

const context = createContext<contextType>({} as any)

function MetaContext(P: WithChildren) {
  const state = useState('Home')

  if (!import.meta.env.SSR) {
    useEffect(() => {
      document.getElementsByTagName(
        'title',
      )[0].textContent = `${state[0]} - myPocket - Money Management App`
    }, [state[0]])
  }

  return <context.Provider value={state}>{P.children}</context.Provider>
}

export function getTitle() {
  const [title] = useContext(context)

  return title
}

export function setTitle(title: string) {
  const [_, set] = useContext(context)
  useEffect(() => {
    set(title)
  }, [])
}

export default MetaContext
