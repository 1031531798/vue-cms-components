<template>
  <div :class="prefixCls">
    <transition name="component-fade" mode="out-in">
      <div
        :class="`${prefixCls}-popover`"
        :style="{ zIndex: 2001 }"
        v-show="isShowNotify"
      >
        <div id="arrow" data-popper-arrow></div>
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
        <List :data="getMessageList">
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
      <slot> <IconFontSvg icon="icon-tongzhi" size="50" /> </slot>
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
import { createPopper } from "@popperjs/core";
import { shallowReactive } from "vue";
import IconFontSvg from "../../src/components/Icon/IconFontSvg.vue";
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
  directives: {
    // 是否在dom外
    clickOutside: {
      bind(el, binding, node) {
        el.event = function (event) {
          // 判断当前点击是否非Dom范围
          const popover = document.getElementsByClassName(
            "component-notify-popover"
          )[0];
          const detail = document.getElementsByClassName("notify-detail")[0];
          if (
            el !== event.target &&
            !el.contains(event.target) &&
            popover !== event.target &&
            !popover.contains(event.target)
          ) {
            if (detail) {
              if (detail !== event.target && !detail.contains(event.target)) {
                node.context[binding.expression](event);
              }
            } else {
              node.context[binding.expression](event);
            }
          }
        };
        document.body.addEventListener("click", el.event, true);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.event, true);
      },
    },
  },
  methods: {
    shallowReactive,
    addPopover() {
      const control = document.querySelector(`.${this.prefixCls}-control`);
      const tooltip = document.querySelector(`.${this.prefixCls}-popover`);
      if (control && tooltip) {
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
    switchMode() {
      this.isShowNotify = !this.isShowNotify;
      this.$nextTick(() => {
        if (!this.popper) this.addPopover();
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
