<template>
  <div class="container">
    <h1>The Forecast<br>Weather APP</h1>

    <form @submit="onFormSubmit">
      <input type="search" placeholder="Search" name="city">
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
          ></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  methods: {
    onFormSubmit: function(e: Event) {
      e.preventDefault()
      const city = (e.target as HTMLFormElement).city.value
       this.$router.push({ name: 'city', params: { city } })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/mixins.scss';

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;

  height: 100vh;
  width: 100vw;

  padding: 16px;

  @include down(400) {
    gap: 32px;
  }
}

h1 {
  font-size: 3em;
  line-height: 1em;
  font-weight: 900;

  background: -webkit-linear-gradient(#21b150, #d7e69b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @include down(400px) {
    font-size: 2.5em;
  }

  @include down(300px) {
    font-size: 2em;
  }
}

form {
  position: relative;
  width: 100%;
  max-width: 500px;
}

input {
  width: 100%;
  height: 60px;

  color: var(--accent-color);
  font-size: 1.1em;
  font-weight: 700;

  border-radius: 15px;
  outline: none;
  border: none;
  padding: 0 60px 0 20px;
}


button {
  position: absolute;
  padding: 5px 0 0 0;
  cursor: pointer;

  top: 50%;
  right: 15px;

  transform: translateY(-50%);

  background: transparent;
  border: none;
  outline: none;

  & svg {
    width: 30px;
    height: 30px;
  }
}
</style>
