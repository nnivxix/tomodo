import { createRouter, createWebHistory } from "vue-router";
import Create from "../pages/Create.vue";
import Home from "../pages/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/create", component: Create },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
