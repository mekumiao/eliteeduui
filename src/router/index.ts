import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext
} from "vue-router";
import { nprogress } from "@/plugins/my-nprogress";
import { routes } from "./pages"; //+
import { apiAuth } from "@/apis/adminAuthApi"; //+ 发现一个很神奇的东西,试着把带+的这两项调换,就会报错
import { IsExpire } from "@/utils/my-token";
import store from "@/store";

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
  const token = store.state.accessToken;
  if (token) {
    return next();
  }
  return redirectLogin(to.path, next);
});
/**处理Token失效后依然能访问首页的问题 */
router.beforeEach((to, _from, next) => {
  if (ignorePath(to.path)) {
    return next();
  }
  if (IsExpire(store.state.user)) {
    const accessToken = store.state.accessToken;
    if (accessToken) {
      apiAuth
        .RefreshToken({ Token: accessToken ?? "" })
        .then((res) => {
          store.commit("setAccessToken", res.Token);
          next();
        })
        .catch(() => {
          redirectLogin(to.path, next);
        });
      return next();
    } else {
      return redirectLogin(to.path, next);
    }
  } else {
    return next();
  }
});
/**处理vip */
router.beforeEach((to, _form, next): void => {
  if (ignorePath(to.path)) {
    return next();
  }
  if (
    store.state.user &&
    store.state.user.role.filter((x) => x === "vip").length > 0
  ) {
    if (to.path.startsWith("/vip")) {
      return next();
    } else {
      return next(false);
    }
  } else {
    return next();
  }
});
/**完成进度条 */
router.afterEach(() => {
  nprogress.done();
});

export default router;
