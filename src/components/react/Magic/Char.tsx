import React from 'react'
import { genRandomChar, getRandomColor } from '@services/char'
import useChar from './hooks/useChar'

const size = 15

const Char = () => {
  const c = genRandomChar()
  const color = getRandomColor()

  const { position, opacity } = useChar(size)

  return (
    <div className={`absolute z-0`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.y}px`,
        left: `${position.x}px`,
        opacity,
      }}>
      <span className={`text-${color}-500 text-[${Math.round(size * .8)}px]`}>
        {c}
      </span>
    </div>
  )
}

export default React.memo(Char)