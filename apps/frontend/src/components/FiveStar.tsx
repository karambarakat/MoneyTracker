import { Stack } from '@mantine/core'
import React from 'react'
import { Star, StarHalf, StarOff } from 'tabler-icons-react'

function FiveStar({
  onChange,
  value,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <Star
            onClick={() => onChange(i + 1)}
            stroke="gold"
            size={48}
            fill={i < value ? 'gold' : 'transparent'}
          >
            {i}
          </Star>
        )
      })}
    </Stack>
  )
}

export default FiveStar
