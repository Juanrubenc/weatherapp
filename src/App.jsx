import { useEffect, useState } from 'react'
import CardWeather from './components/CardWeather'



function App() {
  const [coords, setCoords] = useState({})



  useEffect(() => {
    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  console.log(coords)


  return (
    <div className="App">
      <CardWeather lon={coords.lon} lat={coords.lat}  />
    </div>
  )
}

export default App
