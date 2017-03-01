import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import PosStore from './store'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    pos: PosStore,
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store
});
