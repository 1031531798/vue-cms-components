import { transformSync } from "@babel/core";

export default (babelOption) => {
  return {
    name: "vueSfcBabelTransform",
    transform(code, filename) {
      let result = null;
      if (filename.indexOf("?rollup-plugin-vue=script.js") >= 0) {
        result = transformSync(code, babelOption).code;
      }
      return result;
    },
  };
}
