import React from 'react'
import { Adjustments, IconProps, Plus } from 'tabler-icons-react'
import * as allTablerIcon from './CategoryAllTabler'

function CategoryTabler({ icon, ...p }: IconProps & { icon?: string }) {
  const IconName = icon && icon in allTablerIcon ? icon : 'Category2'
  // @ts-ignore
  const IconComponent = allTablerIcon[IconName]
  return <IconComponent {...p} />
}

export default CategoryTabler
