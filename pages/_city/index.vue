<template>
  <div class="container">
    <div class="left">
      <RouterLink to="/" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
      </RouterLink>

      <div class="current-day">
        <div class="current-day__title">
          <img :src="`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`" alt="">
          {{ dateToCompleteString(current.dt) }}
        </div>

        <div class="current-day__info">
          <div>Jour - {{kelvinToCelsius(current.temp.day)}}</div>
          <div>Pression - {{current.pressure}}hPa</div>
          <div>Nuit - {{kelvinToCelsius(current.temp.night)}}</div>
          <div>Vent - {{current.wind_speed}}Km/h</div>
          <div>Humidité - {{current.humidity}}%</div>
        </div>
      </div>
    </div>
    <div class="right">a</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Coordinates = {
  lat: string
  lon: number
}

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

export default Vue.extend({
  name: 'WeatherPage',
  methods: {
    dateToCompleteString(date: number) {
      const dateObj = new Date(date * 1000);

      return dateObj.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'})
        .replace(/\b\w/g, l => l.toUpperCase());
    },
    kelvinToCelsius(kelvin: number) {
      return Math.round((kelvin - 273.15) * 10 ) / 10 + '°C';
    }
  },
  async asyncData({params}) {
    const city = params['city'];
    const cityToCoordsUrl = `http://api.weatherstack.com/current?access_key=7a0fa8ca744af6d18c0976bf836ccb65&query=${city}`;

    const coordsRes = await fetch(cityToCoordsUrl);
    if (coordsRes.status !== 200) {
      return {
        error: {
          code: coordsRes.status,
          message: coordsRes.statusText
        }
      }
    }

    const {location}: { location: Coordinates } = await coordsRes.json();
    const coordsToWeatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=hourly,minutely&lang=fr&appid=db988691faf182dfc3750cd1e57f3718`;

    const weatherRes = await fetch(coordsToWeatherUrl);
    if (weatherRes.status !== 200) {
      return {
        error: {
          code: weatherRes.status,
          message: weatherRes.statusText
        }
      }
    }

    const {daily}: { daily: WeatherDay[] } = await weatherRes.json();

    return {current: daily[0], days: daily.slice(1)};
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: wheat;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 64px 96px 0 64px;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 64px;
  border-radius: 50%;

  background-color: var(--accent-color);
  color: white;

  & svg {
    width: 32px;
    height: 32px;
  }
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
}

.current-day {
  background-color: var(--accent-color);
  border-radius: 15px 15px 0 0;

  width: 100%;
  max-width: 400px;
  padding: 25px 25px 80px 25px;
  color: white;
}

.current-day__title {
  display: flex;
  gap: 32px;
  align-items: center;

  font-size: 1.5em;
  font-weight: 700;

  img {
    width: 64px;
    height: 64px;
  }
}

.current-day__info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-weight: 700;
  font-size: 0.9em;
}
</style>