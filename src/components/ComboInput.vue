<template>
  <div class="combo-input-wrap" >
    <input class="combo-input-box" type="text"
           :value="value"
           @input.stop="input($event)"
           @keydown.enter='enter'
           @keydown.down='down'
           @keydown.up='up'
           @focus="open = true" @blur="open = false"
           :placeholder="placeholder"
    />
    <div class="dropdown-menu" :class="{'open':openSuggestion}"
    @mousedown.prevent>
      <a href='#' v-for="(o, idx) in options"
         :class="{'active': idx == current}"
         @click.prevent="select(o)" tabindex="-1"
      >
        <slot :item="o">
          <div>{{ o.title?o.title:JSON.stringify(o) }}</div>
        </slot>
      </a>
    </div>
  </div>
</template>
<style lang="scss">
  .combo-input-wrap {
    position: relative;
    .dropdown-menu {
      z-index:100;
      display:none;
      position: absolute;
      overflow-y: auto;
      left: 0;
      right: 0;
      max-height: 360px;
      background: white;
      padding: 5px;
      border: 1px solid #ccc;
      border-top-width: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      &.open { display: block; }
      & > a {
        display: block;
        border:1px solid transparent;
        padding:2px;
      }
      & > a.active {
        background: #eee;
        border-color: #0c4d78;
      }
    }
  }
</style>
<script lang="babel">
  import Vue from 'vue';

  export default {

    data() {
      return {
        open: false,
        current: 0
      }
    },

    props: {
      placeholder: String,
      options: {
        type: Array,
        required: true
      },
      value: String,
    },

    computed: {
      openSuggestion() {
        return this.selection !== "" &&
          this.options.length != 0 &&
          this.open === true;
      }
    },
    watch: {
      options(v) {
        if(v.length == 0)
          this.current = 0;
        else
          if (v.length <= this.current)
            this.current = v.length -1;
      }
    },
    methods: {
      input($e) {
        this.$emit("input", $e.target.value);
        this.open = true;
      },
      enter() {
        this.$emit('select', this.options[this.current]);
        this.open = false;
      },

      up() {
        if(this.current > 0)
          this.current--;
      },

      down() {
        if(this.current < this.options.length - 1)
          this.current++;
      },

      select(o) {
        this.$emit('select',o);
      },

      isActive(index) {
        return index === this.current;
      },

      change() {
        if(this.open == false) {
          this.open = true;
          this.current = 0;
        }
      },

    }
  }

</script>
