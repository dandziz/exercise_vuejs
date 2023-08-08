<template>
  <Alerts v-if="alert.intent" :content="alert.message" :intent="alert.intent" />
  <router-view />
</template>
<script>
import Alerts from "./components/Alerts.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  components: {
    Alerts,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions("window", ["updateScreenSize"]),
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenSize);
    this.updateScreenSize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
