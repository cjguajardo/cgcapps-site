import React from 'react'
import { genRandomChar, getRandomColor } from '../../../services/char'

const Char = () => {
  const [opacity, setOpacity] = React.useState(0)
  const [position, setPosition] = React.useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const size = 15

  const requestNewChar = () => {
    setOpacity(0)
    const width = document.body.clientWidth - (size * 4)
    const height = document.body.clientHeight - (size * 4)

    const x = Math.floor(Math.random() * width) + (size)
    const y = Math.floor(Math.random() * height) + (size)

    setPosition({ x, y })

    incrementOpacity()
  }

  const incrementOpacity = () => {
    if (opacity < 1) {
      setTimeout(() => {
        setOpacity(opacity => opacity + 0.1)
        incrementOpacity()
      }, 110)
    }
  }

  React.useEffect(() => {
    requestNewChar()
  }, [])

  React.useEffect(() => {
    if (opacity >= 1) {
      // timeout in seconds from 0.5 to 1.5
      const timeout = (Math.floor(Math.random() * 1.5) + 0.5) * 1000
      setTimeout(() => requestNewChar(), timeout)
      return
    }
  }, [opacity])

  const c = genRandomChar()
  const color = getRandomColor()

  return (
    <div className={`absolute z-0`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.y}px`,
        left: `${position.x}px`,
        opacity,
      }}>
      <span className={`text-${color}-500 text-xs`}>
        {c}
      </span>
    </div>
  )
}

export default React.memo(Char)