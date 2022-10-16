const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // choose mode -> pastikan huruf kecil semua
  mode: "development",

  /**
   * path.resolve punya 2 method, yakni __dirname = buat folder, __filename = buat file
   * Kita bisa juga mempunyai lebih dari satu path, bermanfaat buat code splitting
   */
  entry: {
    // set nama file output, bebas namanya apaan
    bundle: path.resolve(__dirname, "src/index.ts"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),

    // caching, dimana si bundle bakal ditambahin hash, dan akan berubah setiap ada perubahan file
    filename: "[name][contenthash].js",

    // buat mencegah adanya 2 file bundle sekaligus, yang terkesan seperti duplikat
    clean: true,

    /**
     * Assets resource loader
     * Fungsi [ext] buat menjaga nama file asli agar tidak direname otomatis
     */
    assetModuleFilename: "[name][ext]",
  },

  // source map
  devtool: "source-map",

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },

    // setup port
    port: 3000,

    // ketika kita menjalankan perintah "yarn run dev", jika diset ke true maka dia otomatis membuka browser
    open: true,

    // hot reload
    hot: true,

    compress: true,
    historyApiFallback: true,
  },

  // configure sass
  module: {
    rules: [
      {
        // pake regex -> jika ada file yang berformat .scss, maka gunakan loader berikut
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        // jika ada file yang berformat .js, maka gunakan loader berikut
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      // assets gambar
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      // typescript
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },

  // format file
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  // plugin
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack from scratch",
      filename: "index.html",
      template: "src/template.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
};
