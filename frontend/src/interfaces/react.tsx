import { ComponentType } from 'react'

export type lazyLoadingFunction = () => Promise<{ default: ComponentType<any> }>
