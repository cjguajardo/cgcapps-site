import { useEffect, useState } from 'react'
import axios from 'axios'

type GeoType = {
  full: string | null
  city: string | null
  country: string | null
  since: Date | null
}

function useGeo () {
  const [geo, setGeo] = useState<GeoType>({
    full: null,
    city: null,
    country: null,
    since: null,
  })

  useEffect(() => {
    const url = 'https://cgcapps-api.vercel.app/api/geo'
    // const url = 'http://localhost:3000/api/geo'
    axios.get(url)
      .then(response => {
        console.log(response.data)
        if (!response.data) return

        const from = `${response.data.city}, ${response.data.country}`
        const diff = Math.round(Math.abs((new Date()).getTime() - (new Date(response.data.date)).getTime()) / 1000)
        let minutes = Math.floor(diff / 60)
        let hours = 0
        let days = 0
        if (minutes > 60) {
          hours = Math.floor(minutes / 60)
          minutes = minutes - (hours * 60)
        }
        if (hours > 24) {
          days = Math.floor(hours / 24)
          hours = hours - (days * 24)
        }
        const since = []
        if (days > 0) {
          since.push(`${days} d`)
        }
        if (hours > 0) {
          since.push(`${hours} h`)
        }
        if (minutes > 0) {
          since.push(`${minutes} m`)
        }
        setGeo({
          full: `${from}, ${since.join(' ')}`,
          city: response.data.city,
          country: response.data.country,
          since: new Date(response.data.date)
        })
      })
      .catch(error => console.log(error))
  }, [])

  return geo
}

export default useGeo