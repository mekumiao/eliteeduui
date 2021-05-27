﻿import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import ElementPlus from "element-plus";
// import MyComponent from "@/plugins/my-component";
import MyNprogress from "@/plugins/my-nprogress";
import VueErrorHander from "@/plugins/vue-errorhandler";
import MyLoading from "@/plugins/my-loading";
import ElFormrule from "@/plugins/el-formrule";
import ElMessage from "@/plugins/el-message";
import VueDirectives from "@/plugins/vue-directives";
// import "@/assets/scss/reset.scss";
import "@/assets/scss/global.scss";
import "@/utils/my-extension";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

createApp(App)
  .use(store, key)
  .use(router)
  .use(ElementPlus, { size: "small", zIndex: 3000, locale })
  // .use(MyComponent)
  .use(MyNprogress)
  .use(VueErrorHander)
  .use(MyLoading)
  .use(ElFormrule)
  .use(ElMessage)
  .use(VueDirectives)
  .mount("#app");
