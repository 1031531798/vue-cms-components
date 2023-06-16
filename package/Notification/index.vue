<template>
  <div :class="prefixCls">
    <div
      :class="`${prefixCls}-popover`"
      v-if="isShowNotify"
    >
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
    <div :class="`${prefixCls}-control`">
      <Icon icon="mdi:bell-outline" width="40" height="40" />
    </div>
  </div>
</template>

<script>
import List from "./List.vue";
import { createPopper } from '@popperjs/core';
import { Icon } from '@iconify/vue2';

export default {
  data() {
    return {
      prefixCls: "component-notify",
      tableLoading: false,
      isShowNotify: false,
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
    const popcorn = document.querySelector(`.${this.prefixCls}-popover`);
    const control = document.querySelector(`.${this.prefixCls}-control`);
    createPopper(popcorn, control);
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
      this.isShowNotify = false;
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

<style lang="scss">
.component-notify {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
  &-popover {
    padding: 0 !important;
  }
  &-button {
    height: 100%;
  }
  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid rgb(197, 197, 197);
    padding: 10px;
    &-tabs {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-tab {
        background: #f2f3f4;
        padding: 5px 10px;
        border-radius: 10px;
        margin: 0 5px;
        cursor: pointer;
      }
      &-active {
        color: #fff;
        background: #42b983 !important;
      }
    }
  }

  span {
    height: 100%;
  }
}
::v-deep .component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
::v-deep .component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
