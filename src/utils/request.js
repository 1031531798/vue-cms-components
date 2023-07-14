import { jsonParse } from "./util.js";

export function request({ method, url, data, params, headers, progress }) {
  return new Promise((resolve, reject) => {
    // 创建一个新的 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest();
    // 请求成功
    xhr.onload = (res) => {
      const {status} = res.target
      if (status === 200) {
        const data = jsonParse(res.target.response)
        resolve(data);
      }else {
        reject(res.target)
      }
    };
    // 请求失败
    xhr.onerror = (res) => {
      reject(res);
    };
    // 监听上传进度事件
    progress &&
      xhr.upload.addEventListener("progress", (event) => {
        progress(event);
      });
    const paramsUrl = getUrlParams(params);
    // 发送请求
    xhr.open(method, `${url}${paramsUrl}`, true);
    headers && setXhrHeaders(xhr, headers)
    xhr.send(data);
  });
}

// 设置header参数
function setXhrHeaders(xhr, headers) {
  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
}

// 获取url参数
function getUrlParams(params) {
  if (!params) return ''
  const keys = Object.keys(params);
  const paramsList = keys.map((key) => {
    return `${key}=${params[key]}`;
  });
  return paramsList.join("&");
}
