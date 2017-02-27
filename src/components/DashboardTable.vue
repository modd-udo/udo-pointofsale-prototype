<template>
  <table class="dashboard-table">
    <thead v-if="headings">
      <tr>
        <td v-for="head in headings">{{head}}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows">
        <td v-for="item in row">{{item}}</td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss">
  table.dashboard-table {
    width:100%;
    thead td { text-align: center; }
    tbody td { text-align:right; }
    tbody td:first-child { text-align: left; }
  }
</style>
<script lang="babel">
  export default{
    props: {
      headings: Array,
      rows: Array,
    },
    components:{
      
    }
  }
</script>
