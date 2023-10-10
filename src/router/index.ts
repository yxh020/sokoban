import { createRouter, createWebHistory } from "vue-router";
import Editor from "@/pages/editor/editor.vue";
import Game from "@/pages/game/game.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "editor",
    },

    {
      name: "editor",
      path: "/editor",
      component: Editor,
    },

    {
      name: "game",
      path: "/game",
      component: Game,
    },
  ],
});
