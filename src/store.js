

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
    newSale() {
      commit('saleCreatred');
    },
    cancelSale({commit}) {
      commit('saleRemoved');
    },
    holdSale({commit}) {
      commit('saleRemoved');
    },
    finaliseSale({commit}) {
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
      state.saleId = state.saleLlist.length - 1;
    },
    saleRemoved(state) {
      state.saleList.splice(state.saleId,1);
      if(state.saleList.length == 0)
        state.saleList.push(emptySale());
      else if(state.saleList.length >= state.saleId)
        state.saleId = state.saleList.length - 1;
    },
    viewChanged(state, view) {
      state.screen = view;
    }
  },

};