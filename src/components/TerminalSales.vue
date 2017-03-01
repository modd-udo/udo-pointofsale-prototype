<template>
  <div>
    <button v-for="(sale, idx) in sales" :class="idx == saleId?'':'secondary'"
            @click.prevent="select(idx)"
            class="button">Sale {{idx + 1}}
    </button>
    <button class="success button" @click.prevent="addSale">Start New Sale</button>
  </div>
</template>
<style lang="scss">

</style>
<script lang="babel">
  export default {
    computed: {
      sales() {
        return this.$store.state.pos.saleList;
      },
      saleId() {
        return this.$store.state.pos.saleId;
      }
    },
    methods: {
      addSale() {
        this.$store.dispatch('pos/newSale');
      },
      select(n) {
        this.$store.dispatch('pos/selectSale', n);
      }
    },
    components: {}
  }
</script>
