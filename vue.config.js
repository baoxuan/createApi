var path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const vConsolePlugin = require("vconsole-webpack-plugin");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
module.exports = {
  baseUrl: "/",
  configureWebpack: config => {
    let pluginsPro = [
      // new BundleAnalyzerPlugin(),
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        routes: ["/"],

        renderer: new Renderer({
          headless: false,
          renderAfterDocumentEvent: "render-event"
        })
      })
    ];
    let pluginsDev = [
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: true // 发布代码前记得改回 false
      })
    ];
    if (process.env.NODE_ENV === "production") {
      // 生产环境
      config.plugins = [...config.plugins, ...pluginsPro];
    } else {
      // 开发
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  }
};
