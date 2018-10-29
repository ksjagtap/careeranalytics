<template>
  <div>

    <h3>Profile</h3>
    <br>
    <div align='center'>
      <img :src="image" alt="" height="170" width="170" align="center">
      <div>
        <br>
      </div>
      <div align='center'>
        <p>Name: Cool Kid</p>
        <p>Faculty: Computing</p>
        <p>Major: Business Analytics</p>
        <p>Year of Study: 2</p>
      </div>
    </div>
  </div>
</template>


<script>
  
  import image from './../profilepic.png'

  export default {
    data: function() {
      return {
        image: image
      }
    },

    mounted() {
      console.log("Mounted")
    }
  }
  
</script>

<style>
  p {
    text-align: center
  }

  text-align: centre

</style>