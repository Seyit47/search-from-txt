import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layout/default.vue";
import MainView from "@/views/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "main-view",
          component: MainView,
        },
      ],
    },
  ],
});

export default router;
