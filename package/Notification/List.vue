<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-main`" style="overflow: auto" v-if="data.length">
      <div
        v-for="item in data"
        :class="`${prefixCls}-main-item ${getItemClass(item)}`"
        :ref="getMessageProps('key', item)"
        :key="getMessageProps('key', item)"
        :title="getMessageProps('content', item)"
        @click="setNotify(item)"
      >
        <slot name="message" :data="item"></slot>
        <img
          v-if="getMessageProps('avatar', item)"
          :src="getMessageProps('avatar', item)"
          alt="avatar"
          :class="`${prefixCls}-main-item-avatar`"
        />
        <div :class="`${prefixCls}-main-item-title`">
          <span class="text-ellipsis">{{
            getMessageProps("content", item)
          }}</span>
          <div :class="`${prefixCls}-main-item-title-desc`">
            <div>{{ getMessageProps("time", item) }}</div>
            <div style="margin-left: 10px">
              {{ getMessageProps("description", item) }}
            </div>
          </div>
        </div>
      </div>
      <div :class="`${prefixCls}-hint`">
        <span>没有更多了...</span>
      </div>
    </div>
    <div :class="`${prefixCls}-empty`" v-else>
      <slot name="empty">
        <img src="./image/empty.png" width="150" alt="empty" />
        <span>暂无未读信息</span>
      </slot>
    </div>
  </div>
</template>

<script>
import "./list.scss";
import { isFunction, isString } from "../../src/utils/is.js";
export default {
  name: "NotificationList",
  data() {
    return {
      prefixCls: "components-notify-list",
      notifyList: [],
      moveId: "",
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      required: true,
    },
    itemClass: {
      type: [Function, String],
      default: "",
    },
    moveAnimate: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    getItemClass() {
      return (item) => {
        if (!this.itemClass) return "";
        if (isFunction(this.itemClass)) {
          return this.itemClass(item);
        }
        return isString(this.itemClass) ? this.itemClass : "";
      };
    },
    getMessageProps() {
      return (key, item) => {
        const defaultProps = {
          key: "id",
          avatar: "avatar",
          content: "content",
          description: "description",
          time: "time",
          ...this.props,
        };
        return item[defaultProps[key]] || "";
      };
    },
  },
  mounted() {
    console.log(this.$slot);
    this.getList();
  },
  methods: {
    getList() {},
    // 已读移除消息
    moveMsg(id) {
      const cell = this.$refs[id][0];
      cell.className =
        cell.className + " animate__animated animate__fadeOutLeft";
      // 设置移除后的重排
      setTimeout(() => {
        cell.style.height = 0;
        cell.style.padding = 0;
      }, 600);
      // 重拍结束后删除元素
      setTimeout(() => {
        cell.remove();
      }, 1000);
    },
    // 点击已读
    setNotify(item) {
      // 去除消息
      this.moveAnimate && this.moveMsg(item.id);
      this.$emit("read", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.components-notify-list {
  width: 100%;
  &-main {
    list-style-type: none;
    width: 100%;
    padding: 0;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    &-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      flex-grow: 1;
      width: 100%;
      cursor: pointer;
      padding: 10px;
      transition: all 0.5s ease-in-out;
      &-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      &:hover {
        background: rgb(236, 245, 255);
      }
      &-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
        width: 80%;
        margin: 0 10px;
        color: #00000073;
        font-size: 14px;
        &-desc {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          color: #999;
        }
        span:first-child {
          color: black;
          padding-bottom: 5px;
          white-space: nowrap;
          text-align: left;
        }
      }
    }
  }
  &-hint {
    color: #999;
    padding: 10px 0;
    text-align: center;
  }
  &-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    span {
      color: #999;
    }
  }
}
.msg-hide {
  height: 0;
}
</style>
