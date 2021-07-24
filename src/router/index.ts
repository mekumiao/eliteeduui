import { message } from "@/plugins/el-message";
import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext
} from "vue-router";
import { nprogress } from "@/plugins/my-nprogress";
import { apiAdminAuth } from "@/apis/adminAuthApi";
import pages from "@/router/pages";
import { IsExpire } from "@/utils/my-token";

pages.push({ path: "/:notFind(.*)", redirect: { name: "page404" } });

const router = createRouter({
  history: createWebHashHistory(),
  routes: pages
});
/**忽略的路由 */
const ignorePath = (path: string): boolean => {
  const paths = ["/login", "/vipLogin", "/vipUpdPassword", "/vipResetPassword"];
  path = path.toLowerCase();
  return paths.filter((item) => item.toLowerCase() == path).length > 0;
};
/**重定向到登陆页 */
const redirectLogin = (path: string, next: NavigationGuardNext): void => {
  if (path.startsWith("/vip")) {
    return next("vipLogin");
  } else {
    return next("login");
  }
};
/**开始进度条 */
router.beforeEach((_to, _from, next): void => {
  nprogress.start();
  return next();
});
/**处理未登录 */
router.beforeEach((to, _from, next): void => {
  if (ignorePath(to.path)) {
    return next();
  }
  const token = store.state.accessToken;
  if (token) {
    return next();
  }
  return redirectLogin(to.path, next);
});
/**处理Token失效后依然能访问首页的问题 */
router.beforeEach((to, _from, next): void => {
  if (ignorePath(to.path)) {
    return next();
  }
  //token过期后
  if (IsExpire(store.state.user)) {
    const accessToken = store.state.accessToken;
    if (accessToken) {
      apiAdminAuth
        .RefreshToken({ Token: accessToken ?? "" })
        .then((res) => {
          store.commit("setAccessToken", res.Token);
          return next();
        })
        .catch(() => {
          return redirectLogin(to.path, next);
        });
    } else {
      return redirectLogin(to.path, next);
    }
  } else {
    return next();
  }
});
/**权限处理 */
router.beforeEach((to, form, next): void => {
  if (ignorePath(to.path)) {
    return next();
  }
  if (store.state.user) {
    const roles = store.state.user.role;
    if (
      roles.filter((x) => x === "admin" || x === "teacher" || x === "priority")
        .length > 0
    ) {
      return next();
    } else if (roles.filter((x) => x === "vip").length > 0) {
      if (to.path.startsWith("/vip")) {
        return next();
      }
    }
    message.showInfo("您没有访问权限");
    return redirectLogin(to.path, next);
  } else {
    return redirectLogin(to.path, next);
  }
});
/**完成进度条 */
router.afterEach(() => {
  nprogress.done();
});

export default router;
