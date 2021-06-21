import { RouteRecordRaw } from "vue-router";
import Home from "@/pages/home/Home.vue";
import Login from "@/pages/login/Login.vue";

/**首页相关 */
import Welcome from "@/pages/home/Welcome.vue";
import About from "@/pages/home/About.vue";
import MyInformation from "@/pages/home/MyInformation.vue";

/**测试页面 */
import Test1 from "@/pages/testpage/Test1.vue";
import Test2 from "@/pages/testpage/Test2.vue";

/**异常页面 */
import Exception403 from "@/pages/exception/403.vue";
import Exception404 from "@/pages/exception/404.vue";
import Exception500 from "@/pages/exception/500.vue";

/**系统管理 */
import SystemVipInfo from "@/pages/system/VipInfo.vue";
import SystemConfig from "@/pages/system/SystemConfig.vue";

/**资源管理 */
import AppEliteSong from "@/pages/resource/AppEliteSong.vue";
import Courseware from "@/pages/resource/Courseware.vue";

/**VIP页面 */
import VipCourseware from "@/pages/vip/VipCourseware.vue";
import VipLogin from "@/pages/vip/VipLogin.vue";
import VipUpdPassword from "@/pages/vip/VipUpdPassword.vue";
import VipResetPassword from "@/pages/vip/VipResetPassword.vue";

export const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home/welcome" },
  { path: "/login", component: Login },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "welcome", component: Welcome },
      { path: "about", component: About },
      { path: "myInformation", component: MyInformation }
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
    path: "/resource/appResource",
    component: Home,
    children: [{ path: "appEliteSong", component: AppEliteSong }]
  },
  {
    path: "/resource",
    component: Home,
    children: [{ path: "courseware", component: Courseware }]
  },
  {
    path: "/system",
    component: Home,
    children: [
      { path: "vipInfo", component: SystemVipInfo },
      { path: "systemConfig", component: SystemConfig }
    ]
  },
  {
    path: "/vipCourseware",
    component: VipCourseware
  },
  {
    path: "/vipLogin",
    component: VipLogin
  },
  {
    path: "/vipUpdPassword",
    component: VipUpdPassword
  },
  {
    path: "/vipResetPassword",
    component: VipResetPassword
  }
];

export default {};
