import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext
} from "vue-router";
import { apiAuth } from "@/apis/adminAuthApi";
import { nprogress } from "@/plugins/my-nprogress";
import { routes } from "./pages";

routes.push({ path: "/:notFind(.*)", redirect: { name: "page404" } });

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
/**忽略的路由 */
const ignorePath = (path: string): boolean => {
  const paths = ["/login", "/vipLogin", "/vipUpdPassword"];
  return (
    paths.filter((item) => item.toLowerCase() === path.toLowerCase()).length > 0
  );
};
/**重定向到登陆页 */
const redirectLogin = (path: string, next: NavigationGuardNext): void => {
  if (path.startsWith("/vip")) {
    next("vipLogin");
  } else {
    next("login");
  }
};
/**开始进度条 */
router.beforeEach((_to, _from, next): void => {
  nprogress.start();
  next();
});
/**处理未登录 */
router.beforeEach((to, _from, next): void => {
  if (ignorePath(to.path)) {
    return next();
  }
  const token = window.localStorage.getItem("token");
  if (!token) {
    return redirectLogin(to.path, next);
  }
  next();
});
/**处理Token失效后依然能访问首页的问题 */
router.beforeEach((to, _from, next) => {
  if (ignorePath(to.path)) {
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
          redirectLogin(to.path, next);
        }
      })
      .catch(() => {
        redirectLogin(to.path, next);
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
