import { Actions } from '@redux/types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

/**
 * @deprecated
 */
export default function setTitle$$(title: string) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch<Actions>({ type: 'META_SET_TITLE', pl: { title } })
  }, [])
}
