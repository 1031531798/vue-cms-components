<template>
  <div :class="prefixCls">
    <div
      :class="`${prefixCls}-popover`"
      :style="{zIndex: 2001}"
      v-if="isShowNotify"
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
      <transition name="component-fade" mode="out-in">
       <List :data="getMessageList"></List>
      </transition>
    </div>
    <div :class="`${prefixCls}-control`" @mouseenter="mouseenterEvent" @mouseleave="mouseleaveEvent">
      <Icon icon="mdi:bell-outline" width="40" height="40" />
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
import { createPopper } from '@popperjs/core';
import { Icon } from '@iconify/vue2';
import './index.css'
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
  components: {
    List,
    Icon
  },
  mounted() {
    const control = document.querySelector(`.${this.prefixCls}-control`);
    const tooltip = document.querySelector(`.${this.prefixCls}-popover`);
    createPopper(control, tooltip, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  },
  computed: {
    getMessageList () {
      return {

      }
    }
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
    moreMessage() {
    },
    setLoading(flag) {
      this.notifyLoading = flag;
    },
  },
};
</script>

