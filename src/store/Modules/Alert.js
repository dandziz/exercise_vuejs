const Alert = {
  namespaced: true,
  state: {
    intent: null,
    message: null,
    timeClose: null,
    dismiss: null,
  },
  actions: {
    info({ commit }, message) {
      commit("info", message);
    },
    danger({ commit }, message) {
      commit("danger", message);
    },
    success({ commit }, message) {
      commit("success", message);
    },
    warning({ commit }, message) {
      commit("warning", message);
    },
    clear({ commit }) {
      commit("clear");
    },
  },
  mutations: {
    info(state, message) {
      state.intent = "info";
      state.message = message;
    },
    danger(state, message) {
      state.intent = "danger";
      state.message = message;
    },
    success(state, message) {
      state.intent = "success";
      state.message = message;
    },
    warning(state, message) {
      state.intent = "warning";
      state.message = message;
    },
    clear(state) {
      state.intent = null;
      state.message = null;
      if (state.timeClose) clearTimeout(state.timeClose);
      if (state.dismiss) {
        state.dismiss.hide();
        state.dismiss = null;
      }
    },
  },
  getters: {},
};

export default Alert;
