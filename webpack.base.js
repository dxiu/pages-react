"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
const setMap = () => {
  const entry = {},
    htmlWebpackPlugins = [];
    const pageName = process.argv[4]
    const filePath = pageName?`src/pages/${pageName}/index.js`:"src/pages/*/index.js"
  const files = glob.sync(path.join(__dirname,filePath));
  files.forEach((file) => {
    const match = file.match(/src\/pages\/(.*)\/index.js/);
    const fileName = match && match[1];
    entry[fileName] = file;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `public/index.html`),//`src/pages/${fileName}/index.html`  `public/index.html`
        filename: `${fileName}/${fileName}.html`,
        title:fileName,
        chunks: [fileName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMap();
module.exports = {
  entry:entry,
  output: {
    filename: "[name]/[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    // assetModuleFilename: 'images/[hash][ext][query]'//自定义文件输出目录
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        /*
          内置的资源模块(asset module)
          asset/resource 发送一个单独的文件并导出URL。之前通过使用 file-loader 实现。
          asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
          asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
          asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
        */
        test: /.(jpe?g|png|svg|gif)$/,
        type: "asset/resource",
        //解析
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          filename: "images/[name].[hash:6][ext]",
          //打包后对资源的引入，文件命名已经有/images了
          publicPath: "../",
        },
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
        ],
      },
      {
        test: /.less$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    require("autoprefixer")({
                      overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
                    }),
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename:'[name]/[name].[contenthash:8].css'
    }),
    ...htmlWebpackPlugins
  ],
};
