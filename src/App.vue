<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <TestZone/>
</template>

<script>
import TestZone from './components/TestZone.vue'

export default {
  name: 'App',
  components: {
    TestZone
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
