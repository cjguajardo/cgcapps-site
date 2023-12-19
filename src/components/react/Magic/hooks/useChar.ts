import { useState, useEffect } from 'react'
function useChar (size: number) {
  const [opacity, setOpacity] = useState(0)
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

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

  useEffect(() => {
    requestNewChar()
  }, [])

  useEffect(() => {
    if (opacity >= 1) {
      // timeout in seconds from 0.5 to 1.5
      const timeout = (Math.floor(Math.random() * 1.5) + 0.5) * 1000
      setTimeout(() => requestNewChar(), timeout)
      return
    }
  }, [opacity])

  return { position, opacity }
}

export default useChar