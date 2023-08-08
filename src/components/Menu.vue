<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu">
    <tab-menu @showComponent="showComponent" @actionPanel="actionPanel" />
    <div class="relative">
      <transition mode="out-in">
        <keep-alive>
          <div class="user absolute top-0 left-0 w-full" v-if="activeComponent">
            <action-menu @actionPanel="actionPanel" />
            <user-information :isSearch="false" />
          </div>
        </keep-alive>
      </transition>
      <transition mode="out-in">
        <keep-alive>
          <div class="search absolute top-0 left-0 w-full p-[13px]">
            <search-menu @actionPanel="actionPanel" v-if="!activeComponent" />
          </div>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import TabMenu from "../components/TabMenu.vue";
import ActionMenu from "../components/ActionMenu.vue";
import UserInformation from "../components/UserInformation.vue";
import SearchMenu from "../components/SearchMenu.vue";
export default {
  components: {
    TabMenu,
    ActionMenu,
    UserInformation,
    SearchMenu,
  },
  data() {
    return {
      activeComponent: true,
    };
  },
  methods: {
    showComponent(isFlag) {
      if (this.activeComponent === isFlag) return;
      else this.activeComponent = isFlag;
    },
    actionPanel(panel) {
      this.$emit("actionPanel", panel);
    },
  },
};
</script>

<style scoped>
/* Transition Effect */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.menu {
  width: 26.3021vw;
  border-right: 1px solid var(--border);
}
/* Responsive */

@media screen and (max-width: 1600px) and (max-height: 900px) {
}
@media screen and (max-width: 1510px) and (max-height: 900px) {
}
@media screen and (max-width: 1280px) and (max-height: 1080px) {
}
@media screen and (max-width: 1280px) and (max-height: 720px) {
}
@media screen and (max-width: 960px) and (max-height: 540px) {
}
@media screen and (max-width: 640px) and (max-height: 360px) {
  /* Search */
}
/* Ipad */
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .menu {
    width: 100%;
  }
}
@media screen and (((width: 820px) and (height: 1180px)) or ((width: 768px) and (height: 1024px))) {
  .menu {
    width: calc(100vw - 62vw - 60px);
  }
}
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .user,
  .search {
    position: relative;
  }
  .menu {
    border-width: 0;
  }
}
</style>
