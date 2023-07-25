<template>
  <div :class="prefixCls">
    <transition name="component-fade" mode="out-in">
      <div
        :class="`${prefixCls}-popover`"
        :style="{ zIndex: getZIndex() }"
        v-show="isShowNotify"
      >
        <div class="popper-arrow" data-popper-arrow></div>
        <div :class="`${prefixCls}-header`">
          <slot name="header">
            <div :class="`${prefixCls}-header-tabs`">
              <span
                :class="`${prefixCls}-header-tabs-tab ${
                  componentsName === item.name
                    ? prefixCls + '-header-tabs-active'
                    : ''
                }`"
                v-for="item in headerList"
                :key="item.name"
                @click="changeTag(item)"
                >{{ item.label }}</span
              >
            </div>
          </slot>
        </div>
        <List
          :props="messageProps"
          :data="getMessageList"
          @read="handleReadMsg"
        >
          <template #empty>
            <slot name="empty"></slot>
          </template>
        </List>
      </div>
    </transition>
    <div
      :class="`${prefixCls}-control`"
      @click="clickEvent"
      @mouseenter="mouseenterEvent"
      @mouseleave="mouseleaveEvent"
    >
      <slot>
        <IconFontSvg icon="icon-tongzhi" size="50" />
      </slot>
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
import { createPopper } from "@popperjs/core";
import IconFontSvg from "../../src/components/Icon/IconFontSvg.vue";
import { getZIndex } from "../../src/utils/util.js";
export default {
  name: "VccNotifications",
  data() {
    return {
      prefixCls: "component-notify",
      tableLoading: false,
      isShowNotify: false,
      tabList: [{ label: "系统消息", name: "SystemList" }],
      popper: undefined,
      tabActive: "SystemList",
      componentsName: "SystemList",
      notifyLoading: false,
    };
  },
  props: {
    trigger: {
      type: String,
      default: "click",
    },
    messageProps: {
      type: Object,
      default: () => {
        return {
          key: "id",
          avatar: "avatar",
          content: "content",
          description: "description",
          time: "time",
        };
      },
    },
    headerList: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    IconFontSvg,
    List,
  },
  mounted() {
    if (this.isShowNotify) this.addPopover();
  },
  computed: {
    getMessageList() {
      return this.list || [];
    },
  },
  methods: {
    getZIndex,
    // 判断是否点击dom外
    watchClickOut(e) {
      const { target } = e;
      const inEl = this.$el.contains(target);
      if (!inEl) {
        this.isShowNotify = false;
      }
    },
    addPopover() {
      const control = document.querySelector(`.${this.prefixCls}-control`);
      const tooltip = document.querySelector(`.${this.prefixCls}-popover`);
      if (control && tooltip) {
        const arrow = document.querySelector("#arrow");
        this.popper = createPopper(control, tooltip, {
          placement: "bottom",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ],
        });
      }
    },
    handleReadMsg(item) {
      console.log(item);
      this.$emit("read", item);
    },
    switchMode() {
      this.isShowNotify = !this.isShowNotify;
      if (this.isShowNotify) {
        document.addEventListener("click", this.watchClickOut);
      } else {
        document.removeEventListener("click", this.watchClickOut);
      }
      this.$nextTick(() => {
        if (!this.popper) this.addPopover();
        // 更新popper 定位
        this.popper.update();
      });
    },
    clickEvent() {
      if (this.trigger !== "click") return;
      this.switchMode();
    },
    mouseenterEvent() {
      console.log("mouseenter");
    },
    mouseleaveEvent() {
      console.log("mouseleave");
    },
    changeTag(tag) {
      if (tag.name !== this.componentsName) {
        this.componentsName = tag.name;
      }
    },
    moreMessage() {},
    setLoading(flag) {
      this.notifyLoading = flag;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
