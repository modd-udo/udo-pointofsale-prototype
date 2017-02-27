<template>
  <div id="app">
    <div id="top-menu-bar">
      <button class="button" @click="view='Dashboard'">Dashboard</button>
      <button class="button" @click="view='Terminal'">POS Terminal</button>
      <a class="button" href="/admin/">Return to Udo</a>
    </div>
    <div id="pos-body">
      <component :is="view"></component>
    </div>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard'
import Terminal from './components/Terminal'

export default {
  name: 'app',
  data() {
    return {
      view: "Dashboard",
    };
  },
  components: {
    Dashboard,
    Terminal,
  }
}

</script>

<style>
html, body {
  height:100%; width:100%;
  font-family: Verdana, sans-serif;
  font-size: 14px;
}
#app {
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  display:flex;
  flex-direction: column;
  width:100%;
}
#top-menu-bar {
  background-color: #111;
  height:40px;
  width:100%;
}
#pos-body {
  flex-grow:1;
  display:flex;
  width:100%;
}

</style>
