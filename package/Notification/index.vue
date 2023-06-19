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
          <div :class="`${prefixCls}-header-tabs`">
            <span
              :class="`${prefixCls}-header-tabs-tab ${
                componentsName === item.name
                  ? prefixCls + '-header-tabs-active'
                  : ''
              }`"
              v-for="item in tabList"
              :key="item.name"
              @click="changeTag(item)"
              >{{ item.label }}</span
            >
          </div>
        </div>
        <List :data="getMessageList"></List>
      </div>
    </transition>
    <div
      :class="`${prefixCls}-control`"
      @click="clickEvent"
      @mouseenter="mouseenterEvent"
      @mouseleave="mouseleaveEvent"
    >
      <Icon icon="mdi:bell-outline" width="40" height="40" />
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
import { createPopper } from "@popperjs/core";
import { Icon } from "@iconify/vue2";
export default {
  data() {
    return {
      prefixCls: "component-notify",
      tableLoading: false,
      isShowNotify: true,
      tabList: [
        { label: "系统消息", name: "SystemList" },
        // { label: '代办消息', name: 'waitList' }
      ],
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
  },
  components: {
    List,
    Icon,
  },
  mounted() {
    const control = document.querySelector(`.${this.prefixCls}-control`);
    const tooltip = document.querySelector(`.${this.prefixCls}-popover`);
    createPopper(control, tooltip, {
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
  },
  computed: {
    getMessageList() {
      return [
        {id: '1', msgContent: "通知此事 项目即将开始 请做好安全防范工作", sendDate: '2023-6-12 12:51:22', avatar: "https://yt3.ggpht.com/ytc/AGIKgqPrNKvseSZ9dhpgVu4gsK4vojDXA1ZNjTFmPfiu-Q=s88-c-k-c0x00ffffff-no-rj" }
      ];
    },
  },
  directives: {
    // 是否在dom外
    clickOutside: {
      bind(el, binding, node) {
        el.event = function (event) {
          // 判断当前点击是否非Dom范围
          const popover = document.getElementsByClassName(
            "aochen-notify-popover"
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
    switchMode(value) {
      console.log(value);
      this.isShowNotify = false;
    },
    clickEvent() {
      if (this.trigger !== "click") return;
      this.isShowNotify = !this.isShowNotify;
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