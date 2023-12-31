import { customerService } from "../../services";

const Customer = {
  namespaced: true,
  state: {
    customerList: [],
    getCustomerByEmail: {},
    getByPhoneNumber: [],
    chooseCustomer: {},
  },
  mutations: {
    getByEmail(state, customer) {
      state.getCustomerByEmail = customer;
    },
    getByPhoneNumber(state, customers) {
      state.getByPhoneNumber = customers;
    },
    emptyFunction() {},
    getAllCustomers(state, customers) {
      state.customerList = customers;
    },
    reset(state, message) {
      console.log(message);
      state.customerList = [];
      state.getCustomerByEmail = {};
      state.getByPhoneNumber = [];
      state.chooseCustomer = {};
    },
    chooseCustomer(state, customer) {
      state.chooseCustomer = customer;
    },
  },
  actions: {
    getByEmail({ state, commit }, email) {
      try {
        const result = state.customerList.filter(
          (customer) => customer.email === email
        );
        const customer = JSON.parse(JSON.stringify(result));
        if (Array.isArray(customer) && customer.length > 0) {
          commit("getByEmail", customer[0]);
          return customer;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    async getByUsername({ state, commit }, username) {
      try {
        commit("emptyFunction");
        const result = state.customerList.filter(
          (customer) => customer.username === username
        );
        const customer = JSON.parse(JSON.stringify(result));
        if (Array.isArray(customer) && customer.length > 0) {
          return customer;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    async addCustomer({ state, dispatch, commit }, object) {
      try {
        commit("emptyFunction");
        const isAdd = await customerService.addCustomer(object);
        if (isAdd) {
          state.customerList.push(isAdd);
          dispatch(
            "alert/success",
            "Thêm người dùng vào hệ thống thành công!",
            { root: true }
          );
          dispatch("modal/resetBody", "", { root: true });
          return true;
        } else {
          dispatch(
            "alert/danger",
            "Thêm người dùng vào hệ thống thất bại. Vui lòng thử lại!",
            { root: true }
          );
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAllCustomers({ commit }) {
      const customers = await customerService.getAllCustomers();
      commit("getAllCustomers", customers);
    },
    reset({ commit }, message) {
      commit("reset", message);
    },

    async getByPhoneNumber({ commit, state }, phone_number) {
      if (state.customerList.length > 0 && phone_number != "") {
        const phone = customerService.escapeRegExp(phone_number);
        const regexPattern = new RegExp(phone, "i");
        const results = state.customerList.filter((customer) =>
          regexPattern.test(customer.phone_number)
        );
        commit("getByPhoneNumber", results);
        return results;
      } else {
        commit("getByPhoneNumber", []);
        return false;
      }
    },
    chooseCustomer({ commit, state }, id) {
      const result = state.customerList.filter(
        (customer) => customer.id === id
      );
      commit("chooseCustomer", JSON.parse(JSON.stringify(result)));
    },
  },
  getters: {
    getchooseCustomer(state) {
      return state.chooseCustomer;
    },
  },
};

export default Customer;
