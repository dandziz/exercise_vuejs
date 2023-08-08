import { createStore } from "vuex";
import user from "../store/Modules/User";
import customer from "../store/Modules/Customer";
import alert from "../store/Modules/Alert";
import modal from "../store/Modules/Modal";
import window from "../store/Modules/Window";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user: user,
    customer: customer,
    alert: alert,
    modal: modal,
    window: window,
  },
});
