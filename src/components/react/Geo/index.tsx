import useGeo from './hooks/useGeo'

const Geo = () => {
  const geo = useGeo()
  const showDetail = false

  const handleClick = () => {
  }

  return (
    <>
      <article
        className='relative text-[12px] md:text-md md:absolute text-center px-3 py-1 text-indigo-200/25 top-[64px] md:top-[25%] md:left-[-5rem] md:rotate-[270deg]'
        onClick={handleClick}
      >
        <p>{geo.full}</p>
      </article>
      {showDetail && (
        <article className='w-[80%] md:w-[50%] h-40 bg-indigo-800/80 p-4 rounded-lg absolute left-[10%] md:left-[25%] top-[10%] md:top-[25%] z-20'>
          <h1 className='text-center text-3xl font-bold mb-3 uppercase'>Last visit from</h1>
          <p className='text-center'>{geo.city}</p>
          <p className='text-center'>{geo.country}</p>
          <p className='text-center'>
            <time dateTime={geo.since?.toISOString() || ''}>{geo.since?.toLocaleDateString()}</time>
          </p>
        </article>
      )}
    </>
  )
}

export default Geo
