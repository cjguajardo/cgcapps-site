import React from 'react'
// import Item from './Item'
import Char from './Char'

const Magic = () => {
  return (<div
    className="absolute w-full h-screen top-0 left-0 -z-50"
  >
    {Array.from({ length: 10 }).map((_, i) => <Char key={i} />)}
  </div>)
}

export default React.memo(Magic)
