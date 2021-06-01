import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { apiAuth } from "@/apis/authApi";
import { nprogress } from "@/plugins/my-nprogress";
import Home from "@/pages/home/Home.vue";
import Login from "@/pages/login/Login.vue";

/**首页相关 */
import Welcome from "@/pages/home/Welcome.vue";
import About from "@/pages/home/About.vue";

/**测试页面 */
import Test1 from "@/pages/testpage/Test1.vue";
import Test2 from "@/pages/testpage/Test2.vue";

/**异常页面 */
import Exception403 from "@/pages/exception/403.vue";
import Exception404 from "@/pages/exception/404.vue";
import Exception500 from "@/pages/exception/500.vue";

/**系统管理 */
import SystemVisitorUserInfo from "@/pages/system/MyVisitorUserInfo.vue";

/**资源管理 */
import EliteSongManager from "@/pages/appManager/EliteSongManager.vue";

/**访客页面 */
import VisitorEliteSong from "@/pages/visitor/VisitorEliteSong.vue";
import VisitorLogin from "@/pages/visitor/VisitorLogin.vue";

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
  {
    path: "/systemManager",
    component: Home,
    children: [{ path: "visitorUserInfo", component: SystemVisitorUserInfo }]
  },
  {
    path: "/visitorEliteSong",
    component: VisitorEliteSong
  },
  {
    path: "/visitorLogin",
    component: VisitorLogin
  },
  { path: "/:notFind(.*)", redirect: { name: "page404" } }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const ignorePath: string[] = ["/visitorEliteSong", "/visitorLogin"];

/**开始进度条 */
router.beforeEach((_to, _from, next) => {
  nprogress.start();
  next();
});
/**处理未登录 */
router.beforeEach((to, _from, next) => {
  if (to.path === "/login" || ignorePath.indexOf(to.path) > -1) {
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
  if (to.path === "/login" || ignorePath.indexOf(to.path) > -1) {
    return next();
  }
  const session = window.sessionStorage.getItem("state");
  if (!session) {
    apiAuth
      .CheckState()
      .then((flag) => {
        if (flag) {
          window.sessionStorage.setItem("state", "5200");
          next();
        } else {
          next("/login");
        }
      })
      .catch(() => {
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
