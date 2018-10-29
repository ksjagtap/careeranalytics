<template>
  <div>
    <h2>Compare Internships Across Companies</h2>
    <app-comp_int></app-comp_int>
  </div>
</template>


<script>

import comp_int from './comp_int.vue'


  export default {
    data: function() {
      return{

      }

    },

    components: {
      'app-comp_int': comp_int
    },

    methods: {

    },

    firebase: {


    }
  }

</script>
