

function emptySale() {
  return {
    status: "new",
    customer: {
      id: -1,
      title: "",
      name: "",
      useremail: "",
      userphone: "",
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
    screen: "Dashboard",
    saleId: 0,
    saleList: [
      emptySale(),
    ]
  },
  getters: {
    sale(state) {
      return state.saleList[state.saleId];
    },
    balance(state) {
      let itemTotal = state.saleList[state.saleId].items.reduce((t, i)=>{
        return t + i.info.price.ex + i.info.price.inc;
      }, 0);
      return itemTotal;
    }
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
    addItem({commit}, prod) {
      if(prod.id && prod.id > 0)
        commit('itemAdded', prod);
    },
    setCustomer({commit}, userData) {
      commit('customerSet', userData);
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
    },
    customerSet(state, userData) {
      state.saleList[state.saleId].customer = userData;
    },
    itemAdded(state, prod) {
      state.saleList[state.saleId].items.unshift({
        info: prod, quantity:1, mode: "purchase",
        discountType: "percent", discountAmount: 0, discountReason: "",
        returnReason:"", returnStock:"hold", returnInvoice:0
      });
    }
  },

};