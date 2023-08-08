<template>
  <div class="screen bg-white" v-if="!mobileTable">
    <div class="customer--insert">
      <button data-modal-target="modalEl" @click="handleClickButtonAddCustomer">
        Tạo người dùng <i class="fa-regular fa-user"></i>
      </button>
    </div>
    <div class="table w-full">
      <div class="tab--panel w-full mb-[17px]">
        <button @click="handleClick(true)" :class="{ active: isList }">
          Lịch sử tương tác
        </button>
        <button @click="handleClick(false)" :class="{ active: !isList }">
          Ghi chú
        </button>
      </div>
      <transition mode="out-in">
        <keep-alive>
          <div v-if="isList">
            <div class="customer--table w-full overflow-auto">
              <table
                class="border-collapse border border-slate-400 w-full border-l-0"
              >
                <thead>
                  <tr>
                    <td class="border border-slate-300 border-l-0">
                      <input type="checkbox" />
                    </td>
                    <td class="border border-slate-300">Name</td>
                    <td class="border border-slate-300">Email</td>
                    <td class="border border-slate-300">Phone Number</td>
                    <td class="border border-slate-300">Address</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="customer in displayedItems" :key="customer">
                    <td class="border border-slate-300">
                      <input
                        type="checkbox"
                        :value="customer.id"
                        v-model="checkBox"
                      />
                    </td>
                    <td class="border border-slate-300 whitespace-nowrap">
                      {{ customer.fullname }}
                    </td>
                    <td class="border border-slate-300 cursor-pointer">
                      <p
                        class="underline decoration-blue-600 text-blue-600"
                        @click="handlePopupCustomer(customer.id)"
                      >
                        {{ customer.email }}
                      </p>
                    </td>
                    <td class="border border-slate-300 whitespace-nowrap">
                      {{ customer.phone_number }}
                    </td>
                    <td class="border border-slate-300 whitespace-nowrap">
                      {{ customer.address }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex justify-end">
              <paginate
                :page-count="pageCount"
                :page-range="3"
                :margin-pages="2"
                :click-handler="clickCallback"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'my-pagination my-pagination-custom flex items-center -space-x-px h-8 text-sm mt-2 mb-2 me-3'"
                :page-class="'m-0'"
                :page-link-class="'flex select-none cursor-pointer font-sans items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'"
                :prev-class="'m-0'"
                :next-class="'m-0'"
                :active-class="'leading-tight text-blue-600 border border-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'"
                :prev-link-class="'select-none flex cursor-pointer font-sans items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700'"
                :next-link-class="'select-none flex cursor-pointer font-sans items-center justify-center px-4 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'"
              >
              </paginate>
            </div>
          </div>
        </keep-alive>
      </transition>
      <transition mode="out-in">
        <div class="w-full" v-if="!isList"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import { useStore, mapState, mapActions } from "vuex";
import Paginate from "vuejs-paginate-next";

export default {
  setup() {
    const store = useStore();
    const account = store.state.user.account;
    return { account };
  },
  components: {
    Paginate,
  },
  data() {
    return {
      isList: true,
      checkBox: [],
      perPage: 20,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("customer", ["customerList"]),
    ...mapState("window", ["mobileTable"]),
    totalPages() {
      return Math.ceil(this.customerList.length / this.perPage);
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.customerList.slice(startIndex, endIndex);
    },
    pageCount() {
      return this.customerList.length % this.perPage === 0
        ? Math.floor(this.customerList.length / this.perPage)
        : Math.floor(this.customerList.length / this.perPage) + 1;
    },
  },
  methods: {
    ...mapActions("customer", ["chooseCustomer"]),
    handleClick(isList) {
      if (isList === this.isList) return;
      else this.isList = !this.isList;
    },
    async handleClickButtonAddCustomer() {
      this.$store.dispatch("modal/show", {
        title: "Thêm người dùng",
        body: "AddCustomer",
        size: "max-w-4xl",
      });
      this.$store.state.modal.modal.show();
    },
    handlePopupCustomer(id) {
      this.chooseCustomer(id);
      this.$store.dispatch("modal/show", {
        title: "Thông tin người dùng",
        body: "CustomerInfo",
        size: "max-w-lg",
      });
      this.$store.state.modal.modal.show();
    },
    clickCallback(pageNum) {
      this.currentPage = pageNum;
      console.log(this.customerList.length);
    },
  },
};
</script>

<style scoped>
.screen {
  width: 65.625vw;
  height: 100%;
}
hr {
  background-color: var(--border);
  height: 1px;
}
.customer--insert {
  margin-top: 6vh;
  /*right: 29px;*/
  display: flex;
  justify-content: end;
}
.customer--insert button {
  font-feature-settings: "clig" off, "liga" off;
  font-family: var(--font-label);
  font-size: 22px;
  font-weight: 400;
  line-height: 20px;
  color: var(--primary-white);
  background-color: var(--primary-color);
  padding: 1.157vh 1.481vw;
  gap: 8px;
  border-radius: 6px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-right: 29px;
  flex-wrap: wrap;
}
.fa-user {
  font-size: 18px;
}
.table {
  margin-top: 3.333vh;
  padding-left: 25.7px;
  padding-right: 32px;
  display: block;
}
table {
  max-width: 100%;
}
.tab--panel {
  border-bottom: 4px solid var(--primary-orange);
}
.tab--panel button {
  padding: 12px 7px 6px 19px;
  padding-right: 14px;
  font-family: var(--font-label);
  font-size: 22px;
  background-color: var(--primary-white);
  border-top: 3px solid #cfcfcf;
  border-left: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
}

.tab--panel button.active {
  border-top: 3px solid var(--primary-orange);
  color: var(--primary-orange);
  transition: 0.3s ease-in-out;
}

thead td:not(td:first-child) {
  color: #7b8395;
  padding: 16px;
  background-color: #f7f8f9;
}
tbody td:not(td:first-child) {
  padding: 12px 16px;
  font-size: 16px;
}
thead td:first-child input,
tbody td:first-child input {
  width: 16px;
  height: 16px;
  border: 1px solid var(--b-4-b-8-c-1, #b4b8c1);
}
tbody td:first-child {
  padding: 16px 16px;
  border-left: 0;
}
thead td:first-child {
  background-color: #f7f8f9;
  padding: 12px 16px;
  border-left: 0;
}
.customer--table {
  max-height: 60vh;
  overflow-y: auto;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.my-pagination {
  display: inline-flex;
}

@media screen and (max-width: 1280px) and (max-height: 720px) {
  .customer--table {
    max-height: 58.7vh;
  }
  tbody td:not(td:first-child),
  thead td:first-child,
  thead td:not(td:first-child) {
    padding: 8px 10px;
  }
  tbody td:first-child {
    padding: 10px 10px;
  }
  .customer--insert button {
    font-size: 16px;
  }
  .fa-user {
    font-size: 12px;
    margin: 3px 0;
  }
  .tab--panel button {
    font-size: 16px;
  }
}
@media screen and (max-width: 960px) and (max-height: 540px) {
  .customer--table {
    max-height: 55.7vh;
  }
  .customer--insert {
    margin-top: 4vh;
  }
  tbody td:not(td:first-child),
  thead td:first-child,
  thead td:not(td:first-child) {
    padding: 6px 8px;
  }

  tbody td:first-child {
    padding: 8px 8px;
  }
}
@media screen and (max-width: 640px) and (max-height: 360px) {
  .customer--table {
    max-height: 55vh;
  }
  tbody td:not(td:first-child),
  thead td:first-child,
  thead td:not(td:first-child) {
    padding: 3px 8px;
    font-size: 12px;
  }
  tbody td:first-child {
    padding: 10px 10px;
  }
  .customer--insert {
    margin-top: 2vh;
  }
  .customer--insert button {
    font-size: 12px;
  }
  .fa-user {
    font-size: 8px;
    margin: 6px 0;
  }
  .tab--panel {
    border-bottom-width: 2px;
  }
  .tab--panel button.active {
    border-top-width: 2px;
  }
  .tab--panel button {
    padding: 6px 5px 6px 5px;
    font-family: var(--font-label);
    font-size: 12px;
    border-top: 2px solid #cfcfcf;
  }
  .table {
    margin-top: 2vh;
    padding-left: 1vw;
    padding-right: 1vw;
  }
}
/* Ipad */
@media screen and (((width: 820px) and (height: 1180px))  or ((width: 768px) and (height: 1024px))) {
  .screen {
    width: 61vw;
    height: 100%;
  }
  .table {
    padding-left: 1vw;
    padding-right: 1vw;
  }
  .customer--table {
    max-height: 64vh;
  }
  tbody td:not(td:first-child),
  thead td:first-child,
  thead td:not(td:first-child) {
    padding: 3px 5px;
  }
}
@media screen and (width: 768px) and (height: 1024px) {
}
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .screen {
    width: 100%;
    margin-top: 1vh;
  }
  .customer--insert {
    margin-top: 0;
  }
  .customer--insert button {
    font-size: 16px;
  }
  .tab--panel button {
    padding: 6px 5px 6px 5px;
    font-family: var(--font-label);
    font-size: 14px;
    border-top: 2px solid #cfcfcf;
  }
  .tab--panel {
    border-bottom-width: 2px;
  }
  .tab--panel button.active {
    border-top-width: 2px;
  }
  .table {
    padding: 0 3px;
  }
  .customer--table {
    max-height: 100%;
  }
  .customer--insert button i {
    margin: 3px 0;
  }
  .customer--insert button,
  .customer--insert button i {
    font-size: 14px;
  }

  thead td:not(td:first-child),
  tbody td:not(td:first-child) {
    font-size: 14px;
  }
}
</style>
