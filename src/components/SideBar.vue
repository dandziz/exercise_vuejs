<template>
  <div
    class="side--bar flex flex-col justify-between"
    :class="{ 'fixed z-50': isMobile }"
  >
    <div>
      <router-link
        :to="{ name: 'customers' }"
        class="icon flex justify-center items-center"
        :class="{ active: isTabChecked == 'contact' }"
        @click="chooseTab('contact')"
      >
        <img src="../assets/images/SideBar/Untitled.svg" alt="" />
      </router-link>
      <router-link
        :to="{ name: 'posts' }"
        class="icon flex justify-center items-center"
        :class="{ active: isTabChecked == 'post' }"
        @click="chooseTab('post')"
      >
        <img src="../assets/images/SideBar/Untitled(1).svg" alt="" />
      </router-link>
      <router-link
        :to="{ name: 'messenger' }"
        class="icon flex justify-center items-center"
        :class="{ active: isTabChecked == 'messenger' }"
        @click="chooseTab('messenger')"
      >
        <img src="../assets/images/SideBar/Untitled(2).svg" alt="" />
      </router-link>
      <router-link
        :to="{ name: 'statistical' }"
        class="icon flex justify-center items-center"
        :class="{ active: isTabChecked == 'statistical' }"
        @click="chooseTab('statistical')"
      >
        <img src="../assets/images/SideBar/Untitled(3).svg" alt="" />
      </router-link>
    </div>
    <div>
      <div class="icon flex justify-center items-center mb-[42.8px] ms-1">
        <img
          src="../assets/images/SideBar/Vector.svg"
          alt=""
          @click="handleLogout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isTabChecked: "contact",
    };
  },
  methods: {
    ...mapActions("user", ["logout"]),
    chooseTab(tab) {
      this.isTabChecked = tab;
    },
    handleLogout() {
      this.logout();
    },
  },
  computed: {
    ...mapState("window", ["isMobile"]),
  },
};
</script>

<style scoped>
.side--bar {
  min-width: 80px;
  height: calc(100vh - 9.26vh);
  background-color: var(--primary-color);
}
.icon {
  width: 100%;
  height: 76px;
  cursor: pointer;
}
.icon.active {
  border-left: 14px solid #ff9e2c;
  transition: 0.3s ease-in-out;
}
@media screen and (max-width: 1280px) and (max-height: 720px) {
  .side--bar {
    min-width: 66px;
    max-width: 66px;
  }
  .icon.active {
    border-left: 10px solid #ff9e2c;
  }
}
@media screen and (max-width: 960px) and (max-height: 540px) {
  .side--bar {
    min-width: 40px;
    max-width: 40px;
  }
  .icon.active {
    border-left: 6px solid #ff9e2c;
  }
  .icon img {
    width: 70%;
  }
  .icon {
    height: 60px;
  }
}
@media screen and (max-width: 640px) and (max-height: 360px) {
}
/* Ipad */
@media screen and (width: 820px) and (height: 1180px) {
  .side--bar {
    min-width: 60px;
    max-width: 60px;
    height: calc(100vh - 100px);
  }
  .icon {
    height: 60px;
    margin-bottom: 2vh;
  }
}
@media screen and (width: 768px) and (height: 1024px) {
}
/* Mobile */
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .side--bar {
    min-width: 35px;
    max-width: 35px;
    height: calc(100vh - 5vh);
    margin-top: 5vh;
  }
  .icon {
    height: 60px;
    margin-bottom: 2vh;
  }
  .icon img {
    width: 65%;
  }
  .icon.active {
    border-left-width: 5px;
  }
}
</style>
