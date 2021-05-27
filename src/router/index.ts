import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { apiAuth } from "@/apis/authApi";
import { nprogress } from "@/plugins/my-nprogress";
import Home from "@/pages/home/Home.vue";
import Login from "@/pages/login/Login.vue";

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

/**爱丽特儿歌管理 */
const EliteSongManager = () =>
  import(
    /* webpackChunkName: "pages" */ "@/pages/appManager/EliteSongManager.vue"
  );

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home/welcome" },
  { path: "/login", component: Login },
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
      { path: "403", component: Exception403, name: "page403" },
      { path: "404", component: Exception404, name: "page404" },
      { path: "500", component: Exception500, name: "page500" }
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
  {
    path: "/sourceManager/appManager",
    component: Home,
    children: [{ path: "eliteSongManager", component: EliteSongManager }]
  },
  { path: "/:notFind(.*)", redirect: { name: "page404" } }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

/**开始进度条 */
router.beforeEach((_to, _from, next) => {
  nprogress.start();
  next();
});
/**处理未登录 */
router.beforeEach((to, _from, next) => {
  if (to.path === "/login") {
    return next();
  }
  const token = window.localStorage.getItem("token");
  if (!token) {
    return next("/login");
  }
  next();
});
/**处理Token失效后依然能访问首页的问题 */
router.beforeEach((to, _from, next) => {
  if (to.path === "/login") {
    return next();
  }
  const session = window.sessionStorage.getItem("state");
  if (!session) {
    apiAuth
      .CheckState()
      .then((flag) => {
        debugger;
        if (flag) {
          document.cookie;
          window.sessionStorage.setItem("state", "5200");
          next();
        } else {
          next("/login");
        }
      })
      .catch(() => {
        debugger;
        next("/login");
      });
  } else {
    next();
  }
});
/**完成进度条 */
router.afterEach(() => {
  nprogress.done();
});

export default router;
