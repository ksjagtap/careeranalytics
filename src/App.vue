<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Firebase from 'firebase'


const App = Firebase.initializeApp({
  // config goes here
})

export const db = firebaseApp.database();  // from every component we need to import {db} from here

// export default {
//   name: 'App'
// }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
