<template>
  <div>
    <h2>Careers By Major</h2>

    <app-cbm_industries></app-cbm_industries>
    <br>
    <br>
    <br>
  </div>

</template>

<script>
import cBM_Industries from './cBM_Industries.vue'
  export default {
    components: {
      'app-cbm_industries': cBM_Industries,
    }
  }

</script>
