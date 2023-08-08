<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="containerClass" id="targetElement" role="alert">
    <div v-html="iconHTML"></div>
    <span class="sr-only">Info</span>
    <div class="ml-3 text-sm font-medium" id="targetElement">{{ content }}</div>
    <button
      type="button"
      :class="closeClass"
      data-dismiss-target="#targetElement"
      aria-label="Close"
      id="triggerElement"
      @click="handleCloseClick"
    >
      <span class="sr-only">Close</span>
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
    </button>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { cva } from "class-variance-authority";
import { Dismiss } from "flowbite";
import { mapState, mapActions, useStore } from "vuex";

export default {
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const intent = props.intent;
    const store = useStore();
    const containerClass = computed(() => {
      return cva(
        "alerts flex items-center fixed right-10 top-8 p-4 mb-4 rounded-lg",
        {
          variants: {
            intent: {
              info: "bg-blue-50 text-blue-800",
              danger: "bg-red-50 text-red-800",
              success: "bg-green-50 text-green-800",
              warning: "bg-yellow-50 text-yellow-800",
            },
          },
        }
      )({ intent: intent });
    });
    const closeClass = computed(() => {
      return cva(
        "ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8",
        {
          variants: {
            intent: {
              info: "bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200",
              danger:
                "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200",
              success:
                "bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200",
              warning:
                "bg-yellow-50 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200",
            },
          },
        }
      )({ intent: intent });
    });
    const icons = {
      info: `<svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`,
      danger: `<svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>`,
    };
    const iconHTML = computed(() => {
      return icons[intent];
    });
    onMounted(() => {
      const $targetEl = document.getElementById("targetElement");
      const $triggerEl = document.getElementById("triggerElement");
      const options = {
        transition: "transition-opacity",
        duration: 1000,
        timing: "ease-out",

        // callback functions
        onHide: (context, targetEl) => {
          return { context: context, targetEl: targetEl };
        },
      };
      const dismiss = new Dismiss($targetEl, $triggerEl, options);
      const timeClose = setTimeout(function () {
        dismiss.hide();
        store.dispatch("alert/clear");
      }, 5000);
      store.state.alert.timeClose = timeClose;
      store.state.alert.dismiss = dismiss;
    });
    return { containerClass, iconHTML, closeClass };
  },
  props: {
    intent: {
      type: String,
      validator(value) {
        return ["info", "danger", "success", "warning"].includes(value);
      },
      default: "info",
    },
    content: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions("alert", ["clear"]),
    handleCloseClick() {
      this.clear();
    },
  },
};
</script>

<style>
.alerts {
  z-index: 100;
}
/*
@media screen and (max-height: 360px) and (max-width: 640px) {
  .alerts {
  }
}
@media screen and (max-width: 414.4px) and (max-height: 915.2px) {
  .alerts {
    right: 12px !important;
  }
}
*/
</style>
