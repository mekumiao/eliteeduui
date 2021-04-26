import { App } from "vue";
import { Plugin } from "@vue/runtime-core/dist/runtime-core";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";
import AppButtonPopover from "@/components/AppButtonPopover.vue";
import AppCardImage from "@/components/AppCardImage.vue";
import AppDialog from "@/components/AppDialog.vue";
import AppDialogOne from "@/components/AppDialogOne.vue";
import AppHeadPortrait from "@/components/AppHeadPortrait.vue";
import AppMenuItem from "@/components/AppMenuItem.vue";
import HomeTopMenu from "@/components/HomeTopMenu.vue";
import HomeLeftMenu from "@/components/HomeLeftMenu.vue";
import MyPageTable from "@/components/MyPageTable.vue";
import MyPageTableColumnBase from "@/components/MyPageTableColumnBase.vue";
import MyPageTableColumnSearch from "@/components/MyPageTableColumnSearch.vue";

export default {
  install: <T>(app: App<T>) => {
    app.component(AppBreadcrumb.name, AppBreadcrumb);
    app.component(AppButtonPopover.name, AppButtonPopover);
    app.component(AppCardImage.name, AppCardImage);
    app.component(AppDialog.name, AppDialog);
    app.component(AppDialogOne.name, AppDialogOne);
    app.component(AppHeadPortrait.name, AppHeadPortrait);
    app.component(AppMenuItem.name, AppMenuItem);
    app.component(HomeTopMenu.name, HomeTopMenu);
    app.component(HomeLeftMenu.name, HomeLeftMenu);
    app.component(MyPageTable.name, MyPageTable);
    app.component(MyPageTableColumnBase.name, MyPageTableColumnBase);
    app.component(MyPageTableColumnSearch.name, MyPageTableColumnSearch);
  }
} as Plugin;
