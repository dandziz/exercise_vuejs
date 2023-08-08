import { userService } from "../../services";
import router from "../../router";
const current_user = JSON.parse(localStorage.getItem("current_user"));
const status = current_user
  ? { status: { loggedIn: true }, user: current_user }
  : { status: {}, current_user: null };
const User = {
  namespaced: true,
  state: {
    status,
    rememberAccount: undefined,
  },
  mutations: {
    loginSuccess(state, account) {
      state.status.status = { loggedIn: true };
      state.status.user = account;
    },
    logout(state) {
      state.status.status = {};
      state.status.user = null;
    },
    getRememberAccount(state, store_user) {
      state.rememberAccount = JSON.parse(store_user);
    },
  },
  actions: {
    login({ dispatch, commit }, object) {
      const { account, password, memory } = object;
      userService.login({ account, password, memory }).then((account) => {
        if (account) {
          dispatch("alert/success", "Đăng nhập thành công!", { root: true });
          commit("loginSuccess", account);
          router.push("/");
        } else {
          dispatch("alert/danger", "Đăng nhập thất bại!", { root: true });
          return false;
        }
      });
    },
    logout({ dispatch, commit }) {
      userService.logout();
      dispatch("customer/reset", "logout", { root: true });
      dispatch("modal/reset", "logout", { root: true });
      commit("logout");
      router.push("/login");
    },
    getRememberAccount({ commit }) {
      const store_user = userService.getRememberAccount();
      commit("getRememberAccount", store_user);
    },
  },
  getters: {},
};

export default User;
