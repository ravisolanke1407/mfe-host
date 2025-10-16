import path from "path";
import dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";

const { ModuleFederationPlugin } = webpack.container;
const { DefinePlugin } = webpack;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const deps = require("./package.json");

export default (env = {}) => {
  const environment = env.ENV || "local";
  dotenv.config({ path: path.resolve(__dirname, `.env.${environment}`) });
  console.log(`🏗️ Building HOST for ENV: ${process.env.ENV_NAME}`);

  return {
    entry: path.resolve(__dirname, "src/index.js"),
    mode: "development",
    devServer: {
      port: 3000,
      historyApiFallback: true,
      static: [
        { directory: path.resolve(__dirname, "dist") },
        { directory: path.resolve(__dirname, "public") },
      ],
    },
    output: {
      publicPath: "auto",
      clean: true,
      module: true,
    },
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
      ],
    },
    resolve: { extensions: [".js", ".jsx"] }, // ⚠️ include .jsx
    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        remotes: {},
        shared: {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        scriptLoading: "module", // ⚠️ needed for React 19 ESM
      }),
      new DefinePlugin({
        "process.env.ENV_NAME": JSON.stringify(process.env.ENV_NAME),
        "process.env.REMOTE_MANIFEST": JSON.stringify(
          process.env.REMOTE_MANIFEST || "local.json"
        ),
      }),
    ],
  };
};
