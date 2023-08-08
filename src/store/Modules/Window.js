// store/modules/screen.js
const Window = {
  namespaced: true,
  state: {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    isMobile: false,
    mobileTable: false,
  },
  actions: {
    updateScreenSize({ commit }) {
      commit("SET_SCREEN_WIDTH", window.innerWidth);
      commit("SET_SCREEN_HEIGHT", window.innerHeight);
      if (window.innerWidth <= 414.4 && window.innerHeight <= 915.2) {
        commit("isMobile", true);
      } else {
        commit("isMobile", false);
        commit("setMobileTable", false);
      }
    },
    isMobile({ state, commit }) {
      if (state.screenWidth <= 414.4 && state.screenHeight <= 915.2) {
        commit("isMobile", true);
      } else {
        commit("isMobile", false);
      }
    },
    setMobileTable({ commit }, flag) {
      commit("setMobileTable", flag);
    },
  },
  mutations: {
    SET_SCREEN_WIDTH(state, width) {
      state.screenWidth = width;
    },
    SET_SCREEN_HEIGHT(state, height) {
      state.screenHeight = height;
    },
    isMobile(state, flag) {
      state.isMobile = flag;
    },
    setMobileTable(state, flag) {
      state.mobileTable = flag;
    },
  },
  getters: {},
};

export default Window;
