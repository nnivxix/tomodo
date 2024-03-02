import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/index.vue";
import Create from "../pages/collection/create.vue";
import DetailCollection from "../pages/collection/id.vue";

const routes = [
  { path: "/", component: Index },
  { path: "/create", component: Create },
  { path: "/collection/:id", component: DetailCollection },
  {
    path: "/collection/:id/edit",
    component: Create,
    name: "edit-collection",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
