import { isString } from "./is.js";
/**
 * 动态插入js
 */
export function loadScript(url) {
  const script = document.createElement("script");
  script.type = "application/javascript";
  script.src = url;
  const body = document.getElementsByTagName("body")[0];
  body.appendChild(script);
}

/**
 * 动态插入css
 */
export function loadStyle(url) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

export function jsonParse(str) {
  try {
    return isString(str) ? JSON.parse(str) : str;
  } catch (err) {
    throw err;
  }
}

let index = 2000;
export function getZIndex() {
  return index++
}
