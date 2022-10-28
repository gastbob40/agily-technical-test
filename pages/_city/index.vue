<template>
  <div class="container" v-bind:style="{backgroundImage: `url(${imageUrl})`}">
    <div class="left">
      <RouterLink to="/" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
      </RouterLink>

      <current-weather-card :day="current"></current-weather-card>
    </div>
    <div class="right">
      <WeatherItem v-for="day in days" v-bind:key="day.dt" :day="day"></WeatherItem>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Coordinates from "~/utils/types/coordinates";
import WeatherDay from "~/utils/types/weatherDay";

export default Vue.extend({
  name: 'WeatherPage',
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

    const flickrUrl = `https://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_types=0&extras=can_comment,can_print,count_comments,count_faves,description,isfavorite,license,media,needs_interstitial,owner_name,path_alias,realname,rotation,url_sq,url_q,url_t,url_s,url_n,url_w,url_m,url_z,url_c,url_l&per_page=25&page=1&lang=fr-FR&orientation=landscape&text=${city.toLowerCase()}&method=flickr.photos.search&api_key=f5b3f49e7b06eccb426bdc2cd7422016&format=json&hermes=1&hermesClient=1&nojsoncallback=1`;
    const flickrRes = await fetch(flickrUrl);
    if (flickrRes.status !== 200) {
      return {
        error: {
          code: flickrRes.status,
          message: flickrRes.statusText
        }
      }
    }
    const {photos} = await flickrRes.json();

    if (photos.photo.length == 0) {
      return {
        error: {
          code: 404,
          message: 'No photos found'
        }
      }
    }

    const imageUrl = photos.photo[0].url_l;

    return {current: daily[0], days: daily.slice(1), imageUrl: imageUrl};
  }
})
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';

.container {
  width: 100vw;
  height: 100vh;
  background-color: wheat;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 64px 96px 0 64px;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  overflow-y: scroll;

  @include down(1000) {
    flex-direction: column;
    padding: 64px 32px 0 32px;
    gap: 32px;
  }
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;

  @include down(1000) {
    width: 100%;
    gap: 32px;
  }
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

.right {
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 20px 0;
}
</style>
