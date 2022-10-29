<!-- Please remove this file from your project -->
<template>
  <div class="current-day">
    <div class="current-day__title">
      <img :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`" alt="">
      {{ dateToCompleteString(day.dt) }}
    </div>

    <div class="current-day__info">
      <div>Jour - {{ kelvinToCelsius(day.temp.day) }}</div>
      <div>Pression - {{ day.pressure }}hPa</div>
      <div>Nuit - {{ kelvinToCelsius(day.temp.night) }}</div>
      <div>Vent - {{ day.wind_speed }}Km/h</div>
      <div>Humidité - {{ day.humidity }}%</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WeatherDay from '~/utils/types/weatherDay'
import { dateToCompleteString, kelvinToCelsius } from '~/utils/date'

export default Vue.extend({
  name: 'CurrentWeatherCard',
  props: {
    day: {
      type: Object as () => WeatherDay,
      required: true
    }
  },
  methods: {
    dateToCompleteString,
    kelvinToCelsius
  }
})
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';

.current-day {
  background-color: var(--accent-color-shade);
  border-radius: 15px 15px 0 0;

  width: 100%;
  max-width: 400px;
  padding: 25px 25px 80px 25px;
  color: white;

  @include down(1000) {
    max-width: 100%;
    border-radius: 15px;
    padding: 25px;

    display: flex;
    flex-direction: column;
    gap: 32px;
  }
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

    @include down(500) {
      width: 96px;
      height: 96px;
    }
  }

  @include down(500) {
    flex-direction: column;
    gap: 8px;
  }
}

.current-day__info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-weight: 700;
  font-size: 0.9em;

  @include down(500) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
