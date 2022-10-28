<!-- Please remove this file from your project -->
<template>
  <div class="day-item">
    <img :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`" alt="">
    <div class="day-item__info">
      <div class="day-item__info__weekday">{{ dateToWeekDay(day.dt) }}</div>
      <div class="day-item__info__day">{{ dateToMonthDay(day.dt) }}</div>
    </div>
    <div class="day-item__temperature">{{ kelvinToCelsius(day.temp.day) }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherDay from "~/utils/types/weatherDay";

export default Vue.extend({
  name: "WeatherPage",
  props: {
    day: {
      type: Object as () => WeatherDay,
      required: true
    }
  },
  methods: {
    dateToCompleteString(date: number) {
      const dateObj = new Date(date * 1000);

      return dateObj.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'})
        .replace(/\b\w/g, l => l.toUpperCase());
    },
    kelvinToCelsius(kelvin: number) {
      return Math.round((kelvin - 273.15) * 10) / 10 + '°C';
    },
    dateToWeekDay(date: number) {
      const dateObj = new Date(date * 1000);

      return dateObj.toLocaleDateString('fr-FR', {weekday: 'long'})
        .replace(/\b\w/g, l => l.toUpperCase());
    },
    dateToMonthDay(date: number) {
      const dateObj = new Date(date * 1000);

      return dateObj.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long'})
        .replace(/\b\w/g, l => l.toUpperCase());
    }
  },
});
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';


.day-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;

  gap: 24px;
  padding: 0 16px 0 8px;

  background-color: var(--accent-color);
  border-radius: 15px;

  @include down(500) {
    flex-direction: column;
    gap: 8px;
    padding: 16px;
  }

  img {
    width: 96px;
    height: 96px;
  }

  .day-item__temperature {
    font-size: 2.5em;
    font-weight: 700;
  }

  .day-item__info {
    text-align: center;

    .day-item__info__weekday {
      font-size: 1.2em;
      font-weight: 700;
    }

    .day-item__info__day {
      font-size: 0.9em;
    }
  }
}
</style>
