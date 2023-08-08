<template>
  <div class="tab-panel flex flex-row">
    <div class="tab-panel__button">
      <button
        class="tab-panel__choice customer-info w-full h-full"
        @click="showComponent(true)"
        :class="{ active: activeComponent === true }"
      >
        Thông tin khách hàng
      </button>
    </div>
    <div class="tab-panel__button">
      <button
        class="tab-panel__choice customer-search w-full h-full"
        @click="showComponent(false)"
        :class="{ active: activeComponent === false }"
      >
        Tìm kiếm
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeComponent: true,
    };
  },
  computed: {
    ...mapState("window", ["isMobile"]),
  },
  methods: {
    showComponent(isFlag) {
      if (this.activeComponent === isFlag) return;
      else {
        this.activeComponent = isFlag;
        this.$emit("showComponent", this.activeComponent);
      }
      if (isFlag === true) {
        this.$emit("actionPanel", "info");
        if (this.isMobile) {
          this.$store.dispatch("window/setMobileTable", false);
        }
      } else {
        if (this.isMobile) {
          this.$store.dispatch("window/setMobileTable", true);
        }
      }
    },
  },
};
</script>

<style scoped>
/* tab-panel */
.tab-panel__button {
  width: 50%;
}
.tab-panel {
  border-bottom: 2px solid var(--border-orange);
}
.tab-panel__choice.active {
  background: url("../assets/images/Menu/Tab\ panel.svg") no-repeat center/cover;
  color: var(--orange);
}
.customer-info,
.customer-search {
  background-color: var(--primary-white) !important;
  font-size: 20px;
  padding: 23px 0px 23px;
  border-right: 1px solid var(--border);
  color: var(--light-grey);
  cursor: pointer;
  font-weight: 600;
}
.customer-search {
  border-top: 1px solid var(--border);
}
/* Responsive */
@media screen and (max-width: 1730px) {
  .customer-info,
  .customer-search {
    font-size: 16px;
  }
}
@media screen and (max-width: 1600px) and (max-height: 900px) {
}
@media screen and (max-width: 1510px) and (max-height: 900px) {
}
@media screen and (max-width: 1280px) and (max-height: 1080px) {
  .customer-info,
  .customer-search {
    font-size: 14px;
  }
}
@media screen and (max-width: 1280px) and (max-height: 720px) {
}
@media screen and (max-width: 960px) and (max-height: 540px) {
  .customer-info,
  .customer-search {
    font-size: 10px;
    padding: 16px 0px 16px;
  }
}
@media screen and (max-width: 640px) and (max-height: 360px) {
  .customer-info {
    padding: 8px 0px 8px;
  }
  .customer-search {
    border-right: 0px;
    padding: 8px 0px 8px;
  }
}
@media screen and (((width: 820px) and (height: 1180px)) or ((width: 768px) and (height: 1024px))) {
}
@media screen and (width: 768px) and (height: 1024px) {
}
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .customer-info,
  .customer-search {
    padding: 12px 0px 12px;
  }
}
</style>
