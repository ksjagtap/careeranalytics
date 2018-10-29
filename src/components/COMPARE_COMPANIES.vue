<template>
  <div>
    <br>
    <br>
    <h2>Compare Positions Across Companies</h2>
  
    <app-comp_coy></app-comp_coy>
  </div>
</template>


<script>

import comp_coy from './comp_coy.vue'


  export default {
    data: function() {
      return{

      }

    },

    components: {
      'app-comp_coy': comp_coy
    },

    methods: {

    },

    firebase: {


    }
  }

</script>
