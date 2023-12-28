import { useEffect, useState } from 'react'

type GeoType = {
  full: string | null
  city: string | null
  country: string | null
  since: Date | null
}

function useGeo() {
  const [geo, setGeo] = useState<GeoType>( {
    full: null,
    city: null,
    country: null,
    since: null,
  } )

  useEffect( () => {
    fetch( 'https://geo.cgcapps.cl', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    } )
      .then( response => response.json() )
      .then( data => {
        console.log( data )
        const from = `${data.city}, ${data.country}`
        const diff = Math.round( Math.abs( ( new Date() ).getTime() - ( new Date( data.date ) ).getTime() ) / 1000 )
        let minutes = Math.floor( diff / 60 )
        let hours = 0
        let days = 0
        if ( minutes > 60 ) {
          hours = Math.floor( minutes / 60 )
          minutes = minutes - ( hours * 60 )
        }
        if ( hours > 24 ) {
          days = Math.floor( hours / 24 )
          hours = hours - ( days * 24 )
        }
        const since = []
        if ( days > 0 ) {
          since.push( `${days} d` )
        }
        if ( hours > 0 ) {
          since.push( `${hours} h` )
        }
        if ( minutes > 0 ) {
          since.push( `${minutes} m` )
        }
        setGeo( {
          full: `${from}, ${since.join( ' ' )}`,
          city: data.city,
          country: data.country,
          since: new Date( data.date )
        } )
      } )
      .catch( error => console.log( error ) )
  }, [] )

  return geo
}

export default useGeo