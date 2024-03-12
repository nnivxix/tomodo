import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/index.vue";
import Create from "../pages/collection/create.vue";
import Edit from "../pages/collection/edit.vue";
import DetailCollection from "../pages/collection/id.vue";
import ImportCollection from "@/pages/import.vue";

const routes = [
  { path: "/", component: Index },
  { path: "/create", component: Create },
  { path: "/collection/:id", component: DetailCollection },
  {
    path: "/collection/:id/edit",
    component: Edit,
    name: "edit-collection",
  },
  {
    path: "/import",
    component: ImportCollection,
    name: "import-collection",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
