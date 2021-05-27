// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/adminpage" : "/",
  outputDir: "dist", // 输出文件目录
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  assetsDir: "", //静态资源生成目录
  devServer: {
    //port: 3389
    port: 3343
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
      config["performance"] = {
        maxEntrypointSize: 2 * 1024 * 1024,
        maxAssetSize: 2 * 1024 * 1024
      };
    }
  },

  chainWebpack: (config) => {
    /**设置'@'的路径 */
    config.resolve.alias.set("@", resolve("src"));
    /**生产环境入口点 */
    config.when(process.env.NODE_ENV === "production", (config) => {
      config.entry("app").clear().add("./src/main.ts");

      //用于CDN优化
      // config.set("externals", {
      //   "video.js": "Video"
      // });
    });
    config.when(process.env.NODE_ENV === "development", (config) => {
      config.entry("app").clear().add("./src/main.ts");
    });

    config.when(process.env.NODE_ENV === "production", (config) => {
      config.plugin("html").tap((args) => {
        args[0].title = "爱丽特教务系统";
        return args;
      });
    });

    config.when(process.env.NODE_ENV === "development", (config) => {
      config.plugin("html").tap((args) => {
        args[0].title = "dev - 爱丽特教务系统";
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
        @import "@/assets/scss/variable.scss";
        `
      }
    }
  }
};
