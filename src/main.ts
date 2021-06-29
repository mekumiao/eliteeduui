import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index";
import store from "@/store/index";
import ElementPlus from "element-plus";
import MyNprogress from "@/plugins/my-nprogress";
import VueErrorHander from "@/plugins/vue-errorhandler";
import MyLoading from "@/plugins/my-loading";
import ElFormrule from "@/plugins/el-formrule";
import ElMessage from "@/plugins/el-message";
import VueDirectives from "@/plugins/vue-directives";
import MyLogout from "@/plugins/my-logout";
import MyComponent from "@/plugins/my-component";
import "animate.css/animate.css";
import "@/utils/my-extension";
import "element-plus/lib/theme-chalk/index.css";
import "@/assets/fonts/iconfont.css";
import "@/assets/scss/helper.scss";
import "@/assets/scss/global.scss";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: "mini", zIndex: 3000, locale })
  .use(MyNprogress)
  .use(MyLoading)
  .use(ElFormrule)
  .use(ElMessage)
  .use(VueDirectives)
  .use(MyLogout)
  .use(MyComponent)
  .use(VueErrorHander)
  .mount("#app");
