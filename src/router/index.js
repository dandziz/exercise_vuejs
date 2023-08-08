import { createRouter, createWebHistory } from "vue-router";
import { authLogin } from "../helpers/index";
import Login from "../views/Login.vue";
import HomePage from "../views/HomePage.vue";
import Customers from "../views/Customers.vue";
import BlankPage from "../views/BlankPage.vue";
import Modals from "../components/AddCustomer.vue";
import NotFound from "../views/404NotFound.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/modals",
    name: "modals",
    component: Modals,
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
    children: [
      {
        path: "/",
        name: "customers",
        component: Customers,
      },
      {
        path: "/posts",
        name: "posts",
        component: BlankPage,
      },
      {
        path: "/messenger",
        name: "messenger",
        component: BlankPage,
      },
      {
        path: "/statistical",
        name: "statistical",
        component: BlankPage,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = JSON.parse(localStorage.getItem("current_user"));
  let isLogin = true;
  if (authRequired && !loggedIn) {
    isLogin = false;
  } else if (authRequired && loggedIn) {
    if (!loggedIn.email || !loggedIn.token) {
      isLogin = false;
    } else {
      if (!authLogin(loggedIn.email, loggedIn.token)) isLogin = false;
    }
  }
  if (isLogin) {
    next();
  } else {
    return next("/login");
  }
});
export default router;
