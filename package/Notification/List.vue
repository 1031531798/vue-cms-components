<template>
  <div :class="prefixCls">
    <ul :class="`${prefixCls}-main`" style="overflow: auto" v-if="data.length">
      <li
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
      </li>
      <li :class="`${prefixCls}-hint`">
        <span>没有更多了...</span>
      </li>
    </ul>
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
        if (isFunction(this.itemClass)) {
          return this.itemClass(item);
        }
        return isString(this.itemClass) ? this.itemClass || '';
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
    console.log(111);
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
@import "list.scss";
</style>
