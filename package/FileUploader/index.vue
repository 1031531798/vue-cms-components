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
        <div
          class="file-container"
          v-if="item.type === 'file'"
          :class="{
            'filter-bg': typeof item.progress === 'number',
          }"
          :style="`background-color: ${
            fileTypeColor[item.suffix] ? fileTypeColor[item.suffix] : 'gray'
          }`"
        >
          <div class="file-suffix">{{ item.suffix }}</div>
          <FileProgress
            v-if="typeof item.progress === 'number'"
            :progress="item.progress"
          />
        </div>
        <div class="img-container" v-else>
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
        <svg
          v-if="!readOnly"
          class="closeBtn"
          viewBox="0 0 100 100"
          height="30%"
          width="30%"
          @click="handleDeleteFile(item)"
        >
          <path
            d="M 0 0 L 85 0 A 15,15 0 0,1 100,15 L 100 100 L 0 0 z"
            fill="#f00"
          ></path>
          <path
            d="M 55 15 L 85 45z M 85 15 L 55 45 z"
            stroke="#fff"
            stroke-width="5"
            stroke-linecap="round"
          ></path>
        </svg>
      </div>
      <div
        v-if="!readOnly && uploadFiles.length < limit"
        class="add-button"
        @click="handleClick"
        :class="loading ? 'disabled' : ''"
      >
        <IconFontSvg icon="icon-yunshangchuan_o" size="50" color="#fff" />
        <input
          type="file"
          :accept="fileAccept"
          ref="file"
          @change="fileUpload"
          multiple
          style="display: none"
        />
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
import { getFileLocalUrl } from "../../src/utils/file.js";
import IconFontSvg from "../../src/components/Icon/IconFontSvg.vue";
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
      const files = file.target.files;
      // // 文件数量限制
      if (this.uploadFiles.length >= this.limit) {
        this.$emit("verify", `上传文件数量不得超过${this.limit}个`);
        return false;
      }
      // 判断文件大小
      if (files[0].size > 1024 * 1024 * this.fileSize) {
        this.$emit("verify", `上传文件大小不得超过${this.fileSize}MB`);
        return false;
      }
      if (files[0].size === 0) {
        this.$emit("verify", `不能上传空文件`);
        return false;
      }
      // 判断文件类型
      const fileType = files[0].type.split("/")[0] === "image" ? "img" : "file";
      if (this.imgOnly && fileType !== "img") {
        return false;
      }
      this.loading = true;
      const id = new Date().valueOf();

      getFileLocalUrl(files[0], (result) => {
        // 添加进度条
        this.uploadFiles.push({
          progress: 0,
          id,
          fileName: files[0].name,
          type: fileType,
          url: result,
        });
      });
      const index = this.uploadFiles.findIndex((item) => item.id === id);
      const data = new FormData();
      const bmf = new BMF();
      bmf.md5(file.target.files[0], (err, md5) => {
        data.append(this.name, file.target.files[0]);
        request({
          url: this.action,
          method: this.requestMethod,
          params: this.params,
          headers: this.headers || {},
          baseURL: "/",
          data,
          progress: (e) => {
            if (this.uploadFiles[this.uploadFiles.length - 1]) {
              const rate = Math.floor((e.loaded / e.total) * 100);
              this.uploadFiles[this.uploadFiles.length - 1].progress = rate;
              if (rate === 100) {
                setTimeout(() => {
                  this.uploadFiles[this.uploadFiles.length - 1].progress = "";
                }, 500);
              }
            }
          },
        })
          .then(({ data }) => {
            this.isUpload = true;
            this.$emit("change", [...this.currentFiles, { ...data.data }]);
            if (fileType === "img") {
              this.$set(this.uploadFiles, index, {
                id,
                ...data.data,
                type: fileType,
                url: data.data,
              });
            } else {
              this.$set(this.uploadFiles, index, {
                id,
                suffix: data.data.fileName.slice(
                  data.data.fileName.lastIndexOf(".") + 1
                ),
                type: fileType,
                ...data.data,
              });
            }
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
            this.$emit("uploadError", err);
            this.uploadFiles.splice(index, 1);
            this.loading = false;
          });
      });
    },
    handleClick() {
      this.$refs.file.value = "";
      this.$refs.file.click();
    },
    handlePreview(file) {},
    handleDownloadFile(file) {
      // window.open(file);
    },
    handleDeleteFile(file) {
      const pathProp = "path";
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

<style lang="scss">
$--border-radius: 10px;
@keyframes fileSlide {
  0% {
    opacity: 0;
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}
.file-uploader {
  .file-list {
    display: grid;
    width: 100%;
    justify-content: start;
    align-items: center;
    gap: 5px;
    grid-auto-flow: row dense;
    grid-template-columns: repeat(auto-fill, 50px);
    grid-template-rows: repeat(auto-fill, 50px);

    .file-card {
      position: relative;
      border-radius: $--border-radius;
      animation: fileSlide 1s;
      .closeBtn {
        position: absolute;
        right: 0;
        top: 0;
        visibility: hidden;
        cursor: pointer;
      }
      .file-btn {
        top: 0;
        display: flex;
        position: absolute;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.281);
        border-radius: $--border-radius;
        transform: scale(0, 0);
        transition: transform 0.5s;
        gap: 10px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        svg:hover {
          fill: #f8d86a !important;
        }
      }
      &:hover {
        box-shadow: 0 2px 12px 0 #40a0ff;
        .file-btn {
          transform: scale(1, 1);
        }
        .closeBtn {
          visibility: visible;
        }
      }
    }
    .file-item {
      // height: 50px;
      // width: 50px;
      // background: #40a0ff;
      height: 105px;
      width: 105px;
      grid-area: span 2 / span 2;
    }
    // .file-item,
    .img-item {
      // background: #40a0ff;
      height: 105px;
      width: 105px;
      grid-area: span 2 / span 2;
    }
    .file-popover {
      &::before {
        content: attr(file-name);
        position: absolute;
        opacity: 0;
        bottom: 90%;
        z-index: 10;
        transition: all 0.5s;
        // white-space: nowrap;
        border-radius: 5px;
        background: #40a0ffc5;
        border: 1px solid #40a0ff;
        color: #fff;
        padding: 5px 10px;
        line-height: 15px;
        width: 180px;
        left: -20%;
        text-align: center;
        pointer-events: none;
      }
      &:hover::before {
        opacity: 1;
        bottom: calc(100% + 12px);
        pointer-events: all;
      }
      &::after {
        content: "";
        opacity: 0;
        position: absolute;
        bottom: calc(90% - 5px);
        left: calc(50% - 5px);
        width: 0;
        height: 0;
        transition: all 0.5s;
        border-top: 5px solid #40a0ff;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
      }
      &:hover::after {
        opacity: 1;
        bottom: calc(100% + 7px);
      }
    }
    .file-container,
    .img-container {
      position: relative;
      height: 100%;
      width: 100%;
      border-radius: $--border-radius;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
      .file-img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: $--border-radius;
      }
      .file-suffix {
        background-color: rgba(255, 255, 255, 0.5);
        line-height: 18px;
        text-align: center;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        user-select: none;
      }
    }
    .add-button {
      position: relative;
      height: 105px;
      width: 105px;
      border-radius: $--border-radius;
      border: 1px dashed rgb(172, 172, 172);
      grid-area: span 2 / span 2;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        border-color: #000;
      }
    }
    .disabled {
      pointer-events: none;
      cursor: not-allowed;
    }
  }
  .file-type-hint {
    font-size: 12px;
    color: #999;
    display: flex;
    &-text {
      width: 80%;
      max-width: 500px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      user-select: none;
    }
  }
}
.filter-bg {
  filter: blur(8px);
}
</style>
