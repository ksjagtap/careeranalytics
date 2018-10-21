<template>
  <div>
    <h2> Charts based on
      <a href="https://github.com/ankane/vue-chartkick">vue-chartkick</a>
    </h2> Column chart
        <button v-for="(item,index) in barData" @click="add(index)">{{item[0]}}</button>
        <column-chart :data="barData"></column-chart>
  </div>
</template>


<script>
  export default {
    data: function() {
      return{
        barData: [
                ["Jan", 4],
                ["Feb", 2],
                ["Mar", 10],
                ["Apr", 5],
                ["May", 3]
              ]
      }
      
    },

    methods: {
      add: function(index) {
                this.barData[index][1]++
                    // Force a re-render 
                    this.barData.push([1, 1])
                this.barData.pop()
            }
    }
  }
</script>