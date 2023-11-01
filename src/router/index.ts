import { createRouter, createWebHistory } from "vue-router";
import Editor from "@/pages/editor/editor.vue";
import Game from "@/pages/game/game.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "game",
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
