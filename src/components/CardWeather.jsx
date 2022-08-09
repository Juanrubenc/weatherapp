import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'



const CardWeather = ({ lat, lon, }) => {



    const [weather, setWeather] = useState({})
    const [isLoading, setisLoading] = useState(true)
    const [temp, setTemp] = useState()
    const [windSpeed, setWindSpeed] = useState()
    const [isCelsius, setIsCelsius] = useState(true)



    const handleClick = () => setIsCelsius(!isCelsius)



    useEffect(() => {
        const APIKey = 'e6bb3d4e6fce46a49c860583621d0599'
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
        if (lat) {
            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                        farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
                    }
                    const windSpeed = {
                        km: `${Math.round(res.data.wind.speed * 3.6)} km/h `,
                        mh: `${Math.round(res.data.wind.speed * 2.237)} Mph`
                    }
                    setWindSpeed(windSpeed)
                    setTemp(temp)
                    setisLoading(false)
                })
                .catch(err => console.log(err))
        }
    }
        , [lat])

    if (isLoading) {
        return <LoadingScreen />
    } else {
        return (
            <div className='container flx'>
                <div className='main'>
                    <div className='info-main'>
                        <div className='change'>
                            <span className='app-name'>Weather</span>
                            <span className='FC' onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</span>
                        </div>
                        <p className='city'>{`${weather.name}, ${weather.sys.country}`}</p>
                        <div className='temp-container'>
                                <p className='temp'>{isCelsius ? temp.celsius : temp.farenheit}</p>
                            <div className='img-container'>
                                <img src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                                <p>{weather.weather[0].main}/ {weather.weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='weather-info'>
                        <h2>More info</h2>
                        <ul>
                            <li className='list'><i className="fa-solid fa-wind"></i> <span><b>Wind Speed:</b></span> {isCelsius ? windSpeed.km : windSpeed.mh}</li>
                            <li className='list'><i className="fa-solid fa-gauge-high"></i> <span><b>Pressure:</b></span> {weather.main.pressure} hPa</li>
                            <li className='list'><i className="fa-solid fa-droplet"></i> <span><b>Humidity:</b></span> {weather.main.humidity} %</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default CardWeather
