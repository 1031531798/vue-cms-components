<template>
  <div class="file-uploader">
    <div ref="fileList" class="file-list">
      <div
        v-for="item in uploadFiles"
        :key="item.id"
        class="file-card file-popover"
        :file-name="item.fileName"
        :class="item.type === 'file' ? 'file-item' : 'img-item'"
      >
        <div class="file-over"></div>
<!--        <div class="file-status-box" :class="{'status-translate': item.progress === ''}">-->
<!--          <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Check</title> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF"></path> </g> </svg>-->
<!--        </div>-->
        <div class="file-container" v-if="item.type === 'file'">
          <FileUploadStatusMark :show="item.progress === ''" />
          <IconFontSvg
            :class="{
              'filter-bg': typeof item.progress === 'number',
            }"
            :icon="fileTypeColor[item.suffix]"
          />
          <FileProgress
            v-if="typeof item.progress === 'number'"
            :progress="item.progress"
          />
        </div>
        <div class="img-container" v-else>
          <FileUploadStatusMark :show="item.progress === ''" />
          <img
            :src="item.url"
            class="file-img"
            :class="{
              'filter-bg': typeof item.progress === 'number',
            }"
            :alt="item.fileName"
          />
          <FileProgress
            v-if="typeof item.progress === 'number'"
            :progress="item.progress"
          />
        </div>
        <div v-if="!item.progress" class="file-btn">
          <IconFontSvg icon="icon-yulan" @click="handlePreview" size="35" />
          <IconFontSvg
            icon="icon-xiazai"
            @click="handleDownloadFile"
            size="40"
          />
        </div>
        <span
          v-if="!readOnly"
          class="closeBtn"
          @click="handleDeleteFile">
          <IconFontSvg icon="icon-guanbi" :size="15" />
        </span>
      </div>
      <div
        v-if="!readOnly && uploadFiles.length < limit"
        class="add-button"
        @click="handleClick"
      >
        <IconFontSvg icon="icon-yunshangchuan_o" size="50" color="#fff" />
      </div>
    </div>
    <div
      class="file-type-hint"
      :title="`可以上传的文件类型为: ${fileAccept}`"
      v-if="showHint"
    >
      <div class="file-type-hint-text">
        {{ `可以上传的文件类型为: ${fileAccept}` }}
      </div>
    </div>
  </div>
</template>

<script>
import fileColor from "./fileTypeColor.json";
import FileProgress from "./fileProgress.vue";
import BMF from "browser-md5-file";
import { request } from "../../src/utils/request.js";
import { getFileLocalUrl, openFileSelect } from "../../src/utils/file.js";
import IconFontSvg from "../../src/components/Icon/IconFontSvg.vue";
import SnowflakeId from 'snowflake-id'
import FileUploadStatusMark from "./fileStatusMark.vue";
const imgType = [".bmp", ".gif", ".jpg", ".jpeg", ".png"];
const fileTypes = [
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".html",
  ".htm",
  ".txt",
  ".rar",
  ".zip",
  ".gz",
  ".bz2",
  ".mp4",
  ".avi",
  ".rmvb",
  ".pdf",
  ".md",
];
const snowflake = new SnowflakeId({
  mid: 42,
  offset: (2019 - 1970) * 31536000 * 1000
})
export default {
  name: "VccFileUploader",
  data() {
    return {
      dialogImageUrl: "",
      uploadFiles: [],
      loading: false,
      height: 110,
      fileLink: undefined,
      fileName: undefined,
      errorIndex: [],
      isUpload: false,
    };
  },
  components: {
    FileUploadStatusMark,
    IconFontSvg,
    FileProgress,
  },
  model: {
    prop: "currentFiles",
    event: "change",
  },
  props: {
    action: {
      type: String,
      required: true,
    }, // 上传的地址
    params: Object, // params参数
    headers: Object, // 上传header参数
    readOnly: {
      // 是否只读
      type: Boolean,
      default: false,
    },
    showHint: {
      // 是否显示提示
      type: Boolean,
      default: false,
    },
    imgOnly: {
      // 是否只保存图片
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "file",
    },
    requestMethod: {
      type: String,
      default: "post",
    },
    currentFiles: {
      type: [Array, String],
      default: () => [],
    },
    limit: {
      type: Number,
      default: 5,
    },
    fileSize: {
      type: Number,
      default: 30,
    },
  },
  computed: {
    fileTypeColor() {
      return fileColor;
    },
    fileAccept() {
      return this.imgOnly
        ? imgType.join(",")
        : [...imgType, ...fileTypes].join(",");
    },
  },
  watch: {
    currentFiles(val) {
      if (val.length !== this.uploadFiles.length) {
        !this.isUpload && this.fileDownload();
        this.isUpload = false;
      } else if (this.uploadFiles.length === 1) {
        // 单个文件切换判断
        if (val.id !== this.uploadFiles[0].id) {
          !this.isUpload && this.fileDownload();
          this.isUpload = false;
        }
      }
    },
  },
  mounted() {
    this.fileDownload();
  },
  methods: {
    fileDownload() {
      const pathProp = "path";
      this.uploadFiles = [];
      if (this.currentFiles.length > 0) {
        const imgFileType = ["gif", "jpeg", "jpg", "png"];
        this.currentFiles.forEach((item) => {
          const type = item.fileName
            .slice(item.fileName.lastIndexOf(".") + 1)
            .toLowerCase();
          if (imgFileType.includes(type) || this.imgOnly === true) {
            item.type = "img";
          } else {
            item.type = "file";
            item.suffix = type;
          }
          if (item[pathProp].includes("http")) {
            this.uploadFiles.push({
              url: item[pathProp],
              ...item,
            });
          } else {
            if (item.type === "img") {
              this.uploadFiles.length < this.currentFiles.length &&
                this.uploadFiles.push(item);
            } else {
              this.uploadFiles.push(item);
            }
          }
        });
      }
    },
    // 文件上传
    fileUpload(file) {
      // // 文件数量限制
      if (this.uploadFiles.length >= this.limit) {
        this.$emit("verify", `上传文件数量不得超过${this.limit}个`);
        return false;
      }
      // 判断文件大小
      if (file.size > 1024 * 1024 * this.fileSize) {
        this.$emit("verify", `上传文件大小不得超过${this.fileSize}MB`);
        return false;
      }
      if (file.size === 0) {
        this.$emit("verify", `不能上传空文件`);
        return false;
      }
      // 判断文件类型
      const fileType = file.type.split("/")[0] === "image" ? "img" : "file";
      if (this.imgOnly && fileType !== "img") {
        return false;
      }
      this.loading = true;
      const id = snowflake.generate();

      getFileLocalUrl(file, (result) => {
        // 添加进度条
        this.uploadFiles.push({
          progress: 0,
          id,
          fileName: file.name,
          suffix: file.name.split(".").at(-1),
          type: fileType,
          url: result,
        });
      });
      const data = new FormData();
      const bmf = new BMF();
      const index = this.uploadFiles.findIndex((item) => item.id === id);
      console.log( this.uploadFiles);
      bmf.md5(file, (err, md5) => {
        data.append(this.name, file);
        request({
          url: this.action,
          method: this.requestMethod,
          params: this.params,
          headers: this.headers || {},
          baseURL: "/",
          data,
          progress: (e) => {
            const index = this.getFileIndexById(id)
            if (this.uploadFiles[index]) {
              const rate = Math.floor((e.loaded / e.total) * 100);
              this.uploadFiles[index].progress = rate;
              if (rate === 100) {
                setTimeout(() => {
                  this.uploadFiles[index].progress = "";
                }, 500);
              }
            }
          },
        })
          .then(({ data }) => {
            // 上传成功
            this.isUpload = true;
            this.$emit("change", [...this.currentFiles, { ...data.data }]);
            this.loading = false;
          })
          .catch((err) => {
            const index = this.getFileIndexById(id)
            this.$emit("uploadError", err);
            this.uploadFiles.splice(index, 1);
            this.loading = false;
          });
      });
    },
    // 根据id获取文件列表中的文件索引
    getFileIndexById (id) {
      return this.uploadFiles.findIndex((item) => item.id === id);
    },    // add upload
    handleClick() {
      openFileSelect({accept: this.fileAccept, multiple: true}).then((files) => {
        for (const file of files) {
          this.fileUpload(file)
        }
      })
    },
    // preview file
    handlePreview(file) {},
    // download file
    handleDownloadFile(file) {
      // window.open(file);
    },
    // 删除 文件
    handleDeleteFile(file) {
      const pathProp = "id";
      this.$emit(
        "change",
        this.currentFiles.filter((item) => item[pathProp] !== file[pathProp])
      );
      this.uploadFiles.splice(
        this.uploadFiles.findIndex((item) => item[pathProp] === file[pathProp]),
        1
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "uploadStyle";
</style>
