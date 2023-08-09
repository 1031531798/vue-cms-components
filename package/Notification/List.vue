<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-main`" style="overflow: auto" v-if="data.length">
      <div
        v-for="item in data"
        :class="`wrapper ${getItemClass(item)}`"
        :ref="getMessageProps('key', item)"
        :key="getMessageProps('key', item)"
        @click="setNotify(item)"
      >
        <MessageNode
          v-if="hasCustomMessage"
          :data="item"
          :class="`${prefixCls}-main-item ${getItemClass(item)}`"
        />
        <div
          v-else
          :class="`${prefixCls}-main-item`"
          :title="getMessageProps('content', item)"
        >
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
      </div>
      <div :class="`${prefixCls}-hint`">
        <span>{{props.name ? '没有更多了...' : '没有更多了...'}}</span>
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
  components: {
    MessageNode: {
      props: {
        data: {
          type: Object,
        },
      },
      render() {
        const data = this.data;
        const parent = this.$parent.parent;
        return parent.$scopedSlots.message({ data });
      },
    },
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
    parent() {
      return this.$parent;
    },
    hasCustomMessage() {
      return this.parent?.$scopedSlots?.message;
    },
    getItemClass() {
      return (item) => {
        if (!this?.itemClass) return "";
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
    this.getList();
  },
  methods: {
    renderSlots() {},
    getList() {},
    // 已读移除消息
    moveMsg(id) {
      const cell = this.$refs[id][0];
      // 设置初始高度
      cell.style.height = cell.offsetHeight + "px";
      cell.className =
        cell.className + " animate__animated animate__fadeOutLeft";
      // 设置移除后的重排
      setTimeout(() => {
        cell.style.width = 0;
        cell.style.height = 0;
      }, 600);
      // 重拍结束后删除元素
      setTimeout(() => {
        cell.remove();
      }, 1000);
    },
    // 点击已读
    setNotify(item) {
      this.moveAnimate && this.moveMsg(item.id);
      // 去除消息
      this.$emit("read", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.components-notify-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 80%;
  &-main {
    list-style-type: none;
    width: 100%;
    padding: 0;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    .wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      transition: all 0.3s ease-in-out;
      width: 100%;
      padding: 0;
    }
    &-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      flex-grow: 1;
      cursor: pointer;
      padding: 10px;
      width: 100%;
      height: 100%;
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
