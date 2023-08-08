<template>
  <div class="screen">
    <Header />
    <div class="container">
      <side-bar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SideBar from "../components/SideBar.vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    store.dispatch("customer/getAllCustomers");
  },
  data() {
    return {};
  },
  components: {
    Header,
    SideBar,
  },
  methods: {},
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 1;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
