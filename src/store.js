

function emptySale() {
  return {
    status: "new",
    customer: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      memberOf: [],
      vouchers: [],
      sales: [],
    },
    items: [],
    payments: [],
    promos: [],
  };
}

export default {
  namespaced: true,
  state: {
    screen: "Terminal",
    saleId: 0,
    saleList: [
      emptySale(),
    ]
  },
  getters: {

  },
  actions: {
    switchView({commit}, view) {
      commit('viewChanged', view);

    },
    newSale({commit}) {
      commit('saleCreated');
    },
    cancelSale({commit}) {
      commit('saleRemoved');
    },
    holdSale({commit}) {
      commit('saleRemoved');
    },
    finaliseSale({commit}) {
    },
    selectSale({commit, state}, saleId) {
      if(saleId >= 0 && saleId < state.saleList.length)
        commit('saleSelected', saleId);
    },
    enterCode(code) {

    },
    addItem() {

    },
    setCustomer(user) {

    },
    createCustomer() {

    },

  },
  mutations: {
    saleCreated(state) {
      state.saleList.push(emptySale());
      state.saleId = state.saleList.length - 1;
    },
    saleRemoved(state) {
      state.saleList.splice(state.saleId,1);
      if(state.saleList.length == 0)
        state.saleList.push(emptySale());
      else if(state.saleList.length >= state.saleId)
        state.saleId = state.saleList.length - 1;
    },
    saleSelected(state, saleId) {
      state.saleId = saleId;
    },
    viewChanged(state, view) {
      state.screen = view;
    }
  },

};