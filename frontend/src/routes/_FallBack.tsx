import React from 'react'
import { Outlet } from 'react-router-dom'

function FallBack() {
  return (
    <div>
      _FallBack
      <Outlet />
    </div>
  )
}

export default FallBack
