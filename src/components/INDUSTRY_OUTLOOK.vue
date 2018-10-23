<template>
  
  <div>
    <h2> Industry Outlook </h2>
    <br>
    <app-I_O_overview></app-I_O_overview>
  </div>

</template>


<script>

import I_O_overview from './I_O_overview.vue'


  export default {
    data: function() {
      return{

      }

    },

    components: {
      'app-I_O_overview': I_O_overview
    },

    methods: {

    },

    firebase: {


    }
  }

</script>
