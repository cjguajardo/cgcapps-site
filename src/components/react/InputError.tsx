import React from 'react'

const InputError = ({ message }: { message: string | null }) => {
  if (message === null) return (<></>)

  return (
    <span className="animate-pulse text-red-500 text-xs italic ms-6">{message}</span>
  )
}

export default React.memo(InputError)