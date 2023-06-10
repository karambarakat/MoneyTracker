import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  arc as d3arc,
  create,
  pie as d3pie,
  range as d3range,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  select,
} from 'd3'
import { Box } from '@mantine/core'

interface PieChart {
  data: { value: number; label: string; color: string }[]
}

const Cs = {
  width: 100,
  height: 100,
  paddings: 20,
  padAngle: (0 * Math.PI) / 180,
  innerRadius: 80,
}

function PieChart({ data }: PieChart) {
  return (
    <Box sx={{ minHeight: '1rem' }}>
      <svg viewBox="0 0 100 100">
        <g>
          <Pie data={data} />
        </g>
        <g className="titles"></g>
      </svg>
    </Box>
  )
}

interface IPie {
  data: { value: number; label: string; color: string }[]
  padAngle?: number
  innerRadius?: number
}
function Pie({ data, padAngle = (0 * Math.PI) / 180 }: IPie) {
  const G = useRef<SVGGElement>(null)

  const { angles, arc } = useMemo(() => {
    return {
      angles: d3pie().padAngle(padAngle).sort(null),
      arc: d3arc().innerRadius(30).outerRadius(50),
    }
  }, [])

  useEffect(() => {
    const ang = angles(data.map(e => e.value))

    select(G.current)
      .selectAll('path')
      .data(ang)
      .join('path')
      // @ts-ignore
      .attr('d', arc)
      .attr('fill', d => data[d.index].color)
      .append('title')
      .text(d => data[d.index].label)
  }, [data])

  return (
    <g
      style={{
        transform: 'translate(50px,50px)',
      }}
      ref={G}
    ></g>
  )
}

export default PieChart
