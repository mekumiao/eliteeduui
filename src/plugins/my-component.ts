﻿import type { App } from "vue";
import type { Plugin } from "@vue/runtime-core/dist/runtime-core";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";
import AppPortrait from "@/components/AppPortrait.vue";
import AppMenuItem from "@/components/AppMenuItem.vue";
import HomeTopMenu from "@/components/HomeTopMenu.vue";
import HomeLeftMenu from "@/components/HomeLeftMenu.vue";
import MyPageTable from "@/components/MyPageTable.vue";
import MyPageTableColumnBase from "@/components/MyPageTableColumnBase.vue";
import MyPageTableColumnSearch from "@/components/MyPageTableColumnSearch.vue";
import AppButtonPopover from "@/components/AppButtonPopover.vue";
import AppCardImage from "@/components/AppCardImage.vue";
import AppEditDialog from "@/components/AppEditDialog.vue";
import AppEditDialogOne from "@/components/AppEditDialogOne.vue";
import AppWorkTab from "@/components/AppWorkTab.vue";
import VipTopMenu from "@/components/VipTopMenu.vue";
import MyUpdPassword from "@/components/MyUpdPassword.vue";
import MyResourcePreview from "@/components/MyResourcePreview.vue";
import MyResetPassword from "@/components/MyResetPassword.vue";
import MyImageUpload from "@/components/MyImageUpload.vue";
import MyFileUpload from "@/components/MyFileUpload.vue";
import MyCustomerFileUpload from "@/components/MyCustomerFileUpload.vue";

export default {
  install: <T>(app: App<T>) => {
    app.component(AppBreadcrumb.name, AppBreadcrumb);
    app.component(AppPortrait.name, AppPortrait);
    app.component(AppMenuItem.name, AppMenuItem);
    app.component(HomeTopMenu.name, HomeTopMenu);
    app.component(HomeLeftMenu.name, HomeLeftMenu);
    app.component(AppButtonPopover.name, AppButtonPopover);
    app.component(AppCardImage.name, AppCardImage);
    app.component(AppEditDialog.name, AppEditDialog);
    app.component(AppEditDialogOne.name, AppEditDialogOne);
    app.component(MyPageTable.name, MyPageTable);
    app.component(MyPageTableColumnBase.name, MyPageTableColumnBase);
    app.component(MyPageTableColumnSearch.name, MyPageTableColumnSearch);
    app.component(AppWorkTab.name, AppWorkTab);
    app.component(VipTopMenu.name, VipTopMenu);
    app.component(MyUpdPassword.name, MyUpdPassword);
    app.component(MyResourcePreview.name, MyResourcePreview);
    app.component(MyResetPassword.name, MyResetPassword);
    app.component(MyImageUpload.name, MyImageUpload);
    app.component(MyFileUpload.name, MyFileUpload);
    app.component(MyCustomerFileUpload.name, MyCustomerFileUpload);
  }
} as Plugin;
