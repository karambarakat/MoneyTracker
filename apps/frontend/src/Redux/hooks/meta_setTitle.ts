import { ActionsObjects } from '@src/redux/types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

/**
 * @deprecated
 */
export default function setTitle$$(title: string) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch<ActionsObjects>({
      type: 'META_SET_TITLE',
      pl: { title },
    })
  }, [])
}
