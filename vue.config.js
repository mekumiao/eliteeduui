/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const setting = require("./src/config/app-setting");

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/admin" : "/",
  outputDir: "dist", // 输出文件目录
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
  assetsDir: "", //静态资源生成目录
  devServer: {
    port: 3389
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
      config["performance"] = {
        maxEntrypointSize: 2 * 1024 * 1024,
        maxAssetSize: 2 * 1024 * 1024
      };
    }

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /element-plus[/]lib[/]locale[/]lang[/]en/,
        "element-plus/lib/locale/lang/zh-cn"
      )
    );
  },

  chainWebpack: (config) => {
    /**设置'@'的路径 */
    config.resolve.alias.set("@", resolve("src"));
    /**生产环境入口点 */
    config.when(process.env.NODE_ENV === "production", (config) => {
      // config.entry("app").clear().add("./src/main-cdn.ts");
      config.entry("app").clear().add("./src/main.ts");
      //CDN优化
      // config.set("externals", {
      //   vue: "Vue",
      //   vuex: "Vuex",
      //   "vue-router": "VueRouter",
      //   lodash: "_",
      //   axios: "axios",
      //   echarts: "echarts",
      //   nprogress: "NProgress",
      //   "element-plus": "ElementPlus"
      // });
    });
    config.when(process.env.NODE_ENV === "development", (config) => {
      config.entry("app").clear().add("./src/main.ts");
    });

    config.when(process.env.NODE_ENV === "production", (config) => {
      config.plugin("html").tap((args) => {
        args[0].title = "爱利特教务系统";
        //args[0].isProduction = true;
        args[0].isProduction = false;
        return args;
      });
    });

    config.when(process.env.NODE_ENV === "development", (config) => {
      config.plugin("html").tap((args) => {
        args[0].title = "dev - 爱利特教务系统";
        args[0].isDevelopment = true;
        return args;
      });
    });
  },

  css: {
    loaderOptions: {
      sass: {
        /**sass前置数据(内容必须是变量) */
        prependData: `
        $env: ${process.env.NODE_ENV};
        $home-left-open-width: ${setting.homeMenuOpenWidth}px;
        $home-left-shrink-width: ${setting.homeMenuShrinkWidth}px;
        @import "@/assets/scss/variable.scss";
        `
      }
    }
  }
};
