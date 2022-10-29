type WeatherDay = {
  dt: number,
  temp: {
    day: number
    night: number
  },
  pressure: number
  humidity: number
  wind_speed: number,
  weather: {
    icon: string
  }[]
}

export default WeatherDay
