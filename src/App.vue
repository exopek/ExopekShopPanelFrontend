<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
   <!-- background image -->
    <div class="gradient-background">
      <TestZone/>
    </div>
  
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

.gradient-background {
  min-height: 100vh; /* Volle Viewport-Höhe */
  background: linear-gradient(to bottom, #000000, #333333);
  color: white; /* Textfarbe für bessere Lesbarkeit */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
