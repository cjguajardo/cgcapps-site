import React from 'react'

type Props = {
  x: number,
  y: number,
  detach: () => void,
}
const size = 4

const Item = ({ x, y, detach }: Props) => {
  const [opacity, setOpacity] = React.useState(0.4)
  const [shouldRender, setShouldRender] = React.useState(true)

  const decrementOpacity = () => {
    if (opacity > 0) {
      setTimeout(() => {
        setOpacity(opacity => opacity - 0.1)
        decrementOpacity()
      }, 150)
    }
  }

  React.useEffect(() => {
    decrementOpacity()
  }, [])

  React.useEffect(() => {
    if (opacity <= 0) {
      setShouldRender(false)
      if (typeof detach === 'function') { setTimeout(() => detach(), 200) }
      return
    }
  }, [opacity])

  return shouldRender ? (
    <div
      className={`absolute bg-indigo-600 z-0`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${y - (size / 2)}px`,
        left: `${x - (size / 2)}px`,
        opacity,
        borderRadius: '50%',
      }}
    >
    </div>
  ) : null
}

export default Item
