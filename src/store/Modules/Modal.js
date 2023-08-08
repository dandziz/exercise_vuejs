const Modal = {
  namespaced: true,
  state: {
    title: null,
    body: "AddCustomer",
    modal: null,
    size: "max-w-4xl",
    status: false,
  },
  actions: {
    title({ commit }, title) {
      commit("info", title);
    },
    setSize({ commit }, size) {
      commit("setSize", size);
    },
    show({ commit }, object) {
      commit("show", object);
    },
    hide({ commit }) {
      commit("hide");
    },
    reset({ commit }, message) {
      commit("reset", message);
    },
  },
  mutations: {
    title(state, title) {
      state.title = title;
    },
    setSize(state, size) {
      state.size = size;
    },
    show(state, object) {
      const { title, body, size } = object;
      state.title = title;
      state.body = body;
      state.size = size;
      state.status = true;
    },
    hide(state) {
      state.title = null;
      state.body = null;
      state.status = true;
    },
    reset(state, message) {
      state.title = message;
      state.body = null;
      state.size = null;
      state.modal = null;
      state.status = null;
    },
  },
  getters: {},
};

export default Modal;
