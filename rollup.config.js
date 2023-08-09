import { defineConfig } from "rollup";
import vue from "rollup-plugin-vue";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
// import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import cssnano from "cssnano";
import path from "path";

const __dirname = "/";
export default defineConfig({
  input: "src/main.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "es",
      sourcemap: false,
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "index",
    },
  ],
  plugins: [
    vue({
      include: /.vue$/,
      compileTemplate: true
    }),
    typescript(),
    commonjs(),
    postcss({
      // 内联css
      minimize: true,
      extensions: [".css", ".scss"],
      to: path.resolve(__dirname, "dist/assets/*"),
      plugins: [
        autoprefixer(),
        postcssImport(),
        cssnano({
          preset: "default", // 使用默认配置
        }),
      ],
    }),
    json(),
    image(),
    babel({
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-transform-optional-chaining"], // 启用可选链语法支持
      exclude: "node_modules/**",
      babelHelpers: "inline",
    }),
  ],
});
