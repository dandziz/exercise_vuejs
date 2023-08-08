<template>
  <div class="group-action">
    <button
      class="action-panel"
      @click="handleActionMenu('info', 1)"
      :class="{ active: action_panel === 1 }"
    >
      <img
        class="information"
        img
        src="../assets/images/Menu/bi_info-circle-fill.svg"
        alt=""
      />
    </button>
    <button
      class="action-panel"
      @click="handleActionMenu('blank', 2)"
      :class="{ active: action_panel === 2 }"
    >
      <img class="messangers" src="../assets/images/Menu/bi_chat.svg" alt="" />
    </button>
    <button
      class="action-panel"
      @click="handleActionMenu('blank', 3)"
      :class="{ active: action_panel === 3 }"
    >
      <img
        class="emails"
        src="../assets/images/Menu/eva_email-outline.svg"
        alt=""
      />
    </button>
    <button
      class="action-panel"
      @click="handleActionMenu('blank', 4)"
      :class="{ active: action_panel === 4 }"
    >
      <img
        class="tasks"
        src="../assets/images/Menu/fluent_clipboard-task-20-filled.svg"
        alt=""
      />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action_panel: 1,
    };
  },
  methods: {
    handleActionMenu(component, ref) {
      this.$emit("actionPanel", component);
      this.action_panel = ref;
    },
  },
};
</script>

<style>
.group-action {
  display: flex;
  align-items: center;
  margin-top: 2vh;
}
.action-panel {
  cursor: pointer;
  background-color: var(--primary-white);
  position: relative;
}
.action-panel.active::before {
  position: absolute;
  content: "";
  left: 0;
  bottom: -1.667vh;
  min-width: 100%;
  height: 3px;
  background-color: var(--primary-orange);
}
.action-panel:first-child {
  margin-left: 2.22vw;
}
.action-panel:nth-child(2) {
  margin-left: 3.125vw;
}
.action-panel:nth-child(3) {
  margin-left: 3.229vw;
}
.action-panel:last-child {
  margin-left: 2.125vw;
}
.information {
  max-width: 3.39vw;
  height: 100%;
}
.messangers {
  max-width: 3.28vw;
  height: 100%;
}
.emails {
  max-width: 4.219vw;
  height: 100%;
}
.tasks {
  max-width: 3.75vw;
  height: 100%;
}
/* Responsive */
@media screen and (max-width: 1730px) {
}
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
}
@media screen and (((width: 820px) and (height: 1180px)) or ((width: 768px) and (height: 1024px))) {
  .group-action {
    justify-content: space-around;
  }
  .action-panel img {
    max-width: 4vw;
    height: 100%;
    margin-left: 0;
  }
}
@media screen and (width: 768px) and (height: 1024px) {
}
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .group-action {
    justify-content: space-around;
    margin-top: 1vh;
  }
  .information {
    max-width: calc(3.39vw * 2);
  }
  .messangers {
    max-width: calc(3.28vw * 2);
  }
  .emails {
    max-width: calc(4.219vw * 2);
  }
  .tasks {
    max-width: calc(3.75vw * 2);
  }
}
</style>
