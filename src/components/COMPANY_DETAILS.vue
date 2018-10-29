<template>
  <div>
    <br>
    <br>
    <h2>Company Details</h2>
    <app-comp-details></app-comp-details>
  </div>
</template>


<script>

import comp_details from './comp_details'


  export default {
    data: function() {
      return{

      }

    },

    components: {
      'app-comp_details': comp_details
    },

    methods: {

    },

    firebase: {


    }
  }

</script>
