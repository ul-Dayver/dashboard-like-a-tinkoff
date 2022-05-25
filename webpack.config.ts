import path from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

type TPlugins = any[];

const plugins: TPlugins = [
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: path.join(__dirname, "public", "index.html"),
      },
      isEnvProduction
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined
    )
  ),
  new MiniCssExtractPlugin({filename: "style.css"}),
  new ForkTsCheckerWebpackPlugin({
    async: false,
    eslint: {
      files: "./src/**/*.{ts,tsx,js,jsx}",
    },
  })
]
if (isEnvDevelopment) {
  plugins.push(new HotModuleReplacementPlugin())
}

const config: Configuration = {
  entry: "./src/index.tsx",
  plugins,
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  }
};

export default config;