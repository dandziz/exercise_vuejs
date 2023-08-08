import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";
import "./assets/tailwind.css";
import Paginate from "vuejs-paginate-next";

createApp(App).use(Paginate).use(store).use(router).mount("#app");
