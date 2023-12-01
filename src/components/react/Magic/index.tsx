import React from 'react'
// import Item from './Item'
import Char from './Char'

const Magic = () => {

  // const [positions, setPositions] = React.useState<Array<{ x: number, y: number, }>>([])

  // const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const _x = e.clientX
  //   const _y = e.clientY

  //   // check if collides with existing positions
  //   const collides = positions.some(p => {
  //     const x = p.x
  //     const y = p.y
  //     const distance = Math.sqrt(Math.pow(x - _x, 2) + Math.pow(y - _y, 2))
  //     return distance < 5
  //   })
  //   if (collides) return

  //   if (positions.length > 1000) {
  //     positions.shift()
  //   }
  //   setPositions([...positions, { x: _x, y: _y }])
  // }

  // const detachHandler = (x: number, y: number) => {
  //   setPositions(positions => positions.filter(p => p.x !== x && p.y !== y))
  // }

  return (<div
    className="absolute w-full h-screen top-0 left-0 -z-50"
  // onMouseMove={mouseMoveHandler}
  >
    {/* {positions.length > 0 && positions.map((p, i) => <Item key={i} x={p.x} y={p.y} detach={() => detachHandler(p.x, p.y)} />)} */}

    {Array.from({ length: 10 }).map((_, i) => <Char key={i} />)}
  </div>)
}

export default React.memo(Magic)
