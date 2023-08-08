<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- Main modal -->
    <Teleport to="body">
      <div
        id="modalEl"
        data-modal-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center"
      >
        <div class="relative w-full max-h-full" :class="size">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ title }}
              </h3>
              <button
                type="button"
                @click="handleCloseModal"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <user-information
                v-if="body === 'CustomerInfo'"
                :isSearch="true"
              />
              <add-customer v-if="body === 'AddCustomer'" />
            </div>
            <!-- Modal footer -->
            <div
              class="flex items-center justify-items-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <button
                data-modal-hide="modalEl"
                type="button"
                class="text-gray-500 bg-slate-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                @click="handleCloseModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup></script>

<script>
import { onMounted } from "vue";
import { useStore, mapState } from "vuex";
import { Modal } from "flowbite";
import AddCustomer from "../components/AddCustomer.vue";
import UserInformation from "../components/UserInformation.vue";
export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      const $targetEl = document.getElementById("modalEl");
      const options = {
        placement: "bottom-right",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900 transition-opacity bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        closable: false,
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      };
      const modal = new Modal($targetEl, options);
      store.state.modal.modal = modal;
    });
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("modal", ["title", "body", "size"]),
  },
  components: {
    AddCustomer,
    UserInformation,
  },
  methods: {
    handleCloseModal() {
      this.$store.state.modal.modal.hide();
    },
  },
  update() {},
};
</script>

<style></style>
