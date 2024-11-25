import { useState, useEffect } from "react"
import axios from "axios"
import { CurrentWeatherCard } from "./components/CurrentWeatherCard"
import { HourlyWeatherCard } from "./components/HourlyWeatherCard"
import { DailyWeatherCard } from "./components/DailyWeatherCard"
import { Map } from "./components/Map"

const API_KEY = "6d4e3470f3a8b57bbff4f9bd827176a9"

function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0
  })   

  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 0,
    longitude: 0
  })

  const [currentData, setCurrentData] = useState({})
  const [hourlyData, setHourlyData] = useState([])
  const [dailyData, setDailyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [timezone, setTimezone] = useState("")
  const [activeTab, setActiveTab] = useState("hourly")
  const [geoError, setGeoError] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  // Load current location weather on component mount
  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    if (navigator.geolocation) {
      setGeoError("")
      setLoading(true)
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      )
    } else {
      setGeoError("Geolocation is not supported by your browser")
      setLoading(false)
    }
  }

  const handleGeolocationSuccess = async (position) => {
    const newCoordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    setCoordinates(newCoordinates)
    await fetchWeatherData(newCoordinates)
  }

  const handleGeolocationError = (error) => {
    setLoading(false)
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setGeoError("Please enable location services to see your local weather")
        break
      case error.POSITION_UNAVAILABLE:
        setGeoError("Location information is unavailable")
        break
      case error.TIMEOUT:
        setGeoError("The request to get user location timed out")
        break
      default:
        setGeoError("An unknown error occurred")
        break
    }
  }

  const fetchWeatherData = async (coords) => {
    try {
      let response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${API_KEY}`
      )
      setCurrentData(response.data.current)
      setHourlyData(response.data.hourly)
      setDailyData(response.data.daily)
      setTimezone(response.data.timezone)
      setMapCoordinates(coords)
      setLoading(false)
    } catch (error) {
      setGeoError("Error fetching weather data")
      setLoading(false)
    }
  }

  async function handleLocationSearch(e) {
    e.preventDefault()
    setLoading(true)
    setGeoError("")
    await fetchWeatherData(coordinates)
    setShowSearch(false)
  }

  function handleChange(e) {
    setCoordinates({...coordinates, [e.target.name]: Number(e.target.value)})
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={getLocation}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
            >
              Refresh Location
            </button>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              {showSearch ? 'Hide Search' : 'Search Location'}
            </button>
          </div>
        </div>

        {/* Collapsible Search Form */}
        {showSearch && (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
              Search by Coordinates
            </h2>
            <form onSubmit={handleLocationSearch} className="space-y-4">
              <input 
                placeholder="Latitude" 
                onChange={handleChange}
                name="latitude"
                type="number"
                step="0.01"
                min="-90"
                max="90"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input 
                placeholder="Longitude" 
                onChange={handleChange}
                name="longitude"
                type="number"
                step="0.01"
                min="-180"
                max="180"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Error message */}
        {geoError && (
          <div className="max-w-xl mx-auto mb-8">
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {geoError}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        )}

        {!loading && Object.keys(currentData).length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                  Current Weather
                </h3>
                <CurrentWeatherCard weatherData={currentData} timezone={timezone}/>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                  Location Map
                </h3>
                <Map latitude={mapCoordinates.latitude} longitude={mapCoordinates.longitude}/>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <button 
                onClick={() => setActiveTab("hourly")} 
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === "hourly" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Hourly Forecast
              </button>
              <button 
                onClick={() => setActiveTab("daily")} 
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === "daily" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Daily Forecast
              </button>
            </div>

            <div className="overflow-hidden">
              <div className={`overflow-x-auto pb-4 ${activeTab === "hourly" ? "block" : "hidden"}`}>
                <div className="inline-flex space-x-4 min-w-full px-4">
                  {hourlyData.map((hour, index) => (
                    <HourlyWeatherCard hour={hour} key={index}/>
                  ))}
                </div>
              </div>
              <div className={`overflow-x-auto pb-4 ${activeTab === "daily" ? "block" : "hidden"}`}>
                <div className="inline-flex space-x-4 min-w-full px-4">
                  {dailyData.map((day, index) => (
                    <DailyWeatherCard day={day} key={index}/>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
