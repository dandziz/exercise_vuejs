<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="breadcrumb">
    <div class="breadcrumb--nav left-[4.541vw] bottom-[1.759vh]">
      <span class="flex items-center gap-[3px] breadcrumb--nav__text"
        ><img src="../assets/images/Header/Home.svg" alt="" />Home</span
      >
      <span class="next">></span>
      <span class="flex items-center gap-[3px] breadcrumb--nav__text"
        >Customers</span
      >
      <!-- 
      <span class="next">></span>
      <span>...</span>
      <span class="next">></span>
      <span class="flex items-center gap-[3px] breadcrumb--nav__text"
        >Application List</span
      >
      <span class="next">></span>
      <span class="flex items-center gap-[3px] breadcrumb--nav__text"
        >An Application</span
      >
       -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.breadcrumb {
  height: 9.26vh;
  background-color: var(--white);
  width: 100%;
  position: relative;
  z-index: -1;
}
.breadcrumb::before {
  position: absolute;
  content: "";
  width: 100vw;
  height: 2.5px;
  bottom: 0;
  right: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: -1;
}
.breadcrumb--nav {
  position: absolute;
  display: flex;
}
span {
  font-family: var(--font-label);
  font-weight: 400;
  line-height: 22px;
}
.breadcrumb--nav__text {
  font-size: 18px;
}
.next {
  margin: 0 8.7px;
  font-size: 14px;
}
@media screen and (max-width: 1280px) and (max-height: 1080px) {
  .breadcrumb--nav__text {
    font-size: 14px;
  }
}
@media screen and (max-width: 960px) and (max-height: 540px) {
  .breadcrumb--nav__text {
    font-size: 12px;
  }
}
@media screen and (max-width: 640px) and (max-height: 360px) {
  .breadcrumb--nav__text {
    font-size: 10px;
  }
}
/* Ipad */
@media screen and (width: 820px) and (height: 1180px) {
  .breadcrumb {
    height: 100px;
  }
}
@media screen and (width: 768px) and (height: 1024px) {
}
/* Mobile */
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .breadcrumb--nav__text {
    font-size: 10.5px;
  }
  .breadcrumb {
    height: 5vh;
    z-index: 50 !important;
    position: fixed !important;
  }
  .breadcrumb--nav {
    bottom: 0.3vh;
  }
  .breadcrumb::before {
    height: 0;
  }
}
</style>
