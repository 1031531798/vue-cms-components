/**
 * @description 根据二进制数据下载文件
 * @param { 二进制数据源 } ref
 * @param {文件名} fileName
 */
export function downloadByBlob(ref, fileName) {
  const blob = new Blob([ref], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

/**
 * @description 获取本地文件 src
 * @param { File } file
 * @param callback
 */
export function getFileLocalUrl(file, callback) {
  const reader = new FileReader();
  // 监听 FileReader 的加载完成事件
  reader.addEventListener("load", () => {
    // 将读取的文件内容作为数据 URL
    callback(reader.result);
  });
  reader.readAsDataURL(file);
}
export function openFileSelect({ accept = "*" }) {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.click();
    input.addEventListener("change", () => {
      resolve(input.files);
    });
  });
}
