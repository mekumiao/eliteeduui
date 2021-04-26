import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/pages/home/Home.vue";

/**首页相关 */
const Welcome = () =>
  import(/* webpackChunkName: "pages" */ "@/pages/home/Welcome.vue");
const About = () =>
  import(/* webpackChunkName: "pages" */ "@/pages/home/About.vue");

/**测试页面 */
const Test1 = () =>
  import(/* webpackChunkName: "pages" */ "@/pages/testpage/Test1.vue");
const Test2 = () =>
  import(/* webpackChunkName: "pages" */ "@/pages/testpage/Test2.vue");

/**异常页面 */
const Exception403 = () =>
  import(/* webpackChunkName: "pages" */ "@/pages/exception/403.vue");
const Exception404 = () =>
  import(/* webpackChunkName: "pages" */ "@/pages/exception/404.vue");
const Exception500 = () =>
  import(/* webpackChunkName: "pages" */ "@/pages/exception/500.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home/welcome" },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "welcome", component: Welcome },
      { path: "about", component: About }
    ]
  },
  {
    path: "/exception",
    component: Home,
    children: [
      { path: "403", component: Exception403 },
      { path: "404", component: Exception404 },
      { path: "500", component: Exception500 }
    ]
  },
  {
    path: "/testpage",
    component: Home,
    children: [
      { path: "test1", component: Test1 },
      { path: "test2", component: Test2 }
    ]
  },
  { path: "/:notFind(.*)", redirect: "/exception/404" }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
