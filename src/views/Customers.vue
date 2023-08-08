<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="container--process" :class="{ 'ms-[35px]': isMobile }">
    <Menu @actionPanel="actionPanel" />
    <component :is="showComponent" :isSearch="true" />
    <Modals />
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import CustomerTable from "../components/CustomerTable.vue";
import UserInformation from "../components/UserInformation.vue";
import BlankComponent from "../components/BlankComponent.vue";
import { shallowRef } from "vue";
import Modals from "../components/Modals.vue";
import { mapState } from "vuex";

export default {
  setup() {},
  data() {
    return {
      showComponent: shallowRef(CustomerTable),
      panel: "",
    };
  },
  components: {
    Menu,
    CustomerTable,
    BlankComponent,
    Modals,
    UserInformation,
  },
  methods: {
    actionPanel(panel) {
      if (panel === "info" && this.showComponent !== CustomerTable) {
        this.showComponent = shallowRef(CustomerTable);
      } else if (panel === "blank") {
        this.showComponent = shallowRef(BlankComponent);
      } else if (panel === "user_info") {
        this.showComponent = shallowRef(UserInformation);
      }
    },
  },
  computed: {
    ...mapState("window", ["isMobile"]),
  },
};
</script>

<style scoped>
.container--process {
  width: 91.98vw;
  height: 88.8vh;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: flex;
}
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .container--process {
    flex-direction: column;
    height: 100%;
    width: calc(100vw - 41px);
    margin-top: 5vh;
  }
}
</style>
