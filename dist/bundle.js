import { createPopper } from '@popperjs/core';
import { Icon } from '@iconify/vue2';

//
//
//
//
//
//

var script$1 = {
  name: 'NotificationList',
  data() {
    return {};
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  }
  // Vue.extend constructor export interop.
  const options = typeof script === 'function' ? script.options : script;
  // render functions
  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true;
    // functional template
    if (isFunctionalTemplate) {
      options.functional = true;
    }
  }
  // scopedId
  if (scopeId) {
    options._scopeId = scopeId;
  }
  let hook;
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context = context ||
      // cached call
      this.$vnode && this.$vnode.ssrContext ||
      // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      }
      // inject component styles
      if (style) {
        style.call(this, createInjectorSSR(context));
      }
      // register component module identifier for async chunk inference
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }
  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      const originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return script;
}

const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
  const group = isOldIE ? css.media || 'default' : id;
  const style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });
  if (!style.ids.has(id)) {
    style.ids.add(id);
    let code = css.source;
    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
      // http://stackoverflow.com/a/26603875
      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }
    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }
      HEAD.appendChild(style.element);
    }
    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      const index = style.ids.size - 1;
      const textNode = document.createTextNode(code);
      const nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  _vm._self._c || _h;
  return _vm._m(0)
};
var __vue_staticRenderFns__$1 = [
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_c("div", [_vm._v("通知1")])])
  },
];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-2e1830ee_0", { source: "\n\n/*# sourceMappingURL=List.vue.map */", map: {"version":3,"sources":["List.vue"],"names":[],"mappings":";;AAEA,mCAAmC","file":"List.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-2e1830ee";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":root {\n    --popover-bg: #fff;\n  --popover-border: 1px solid #ebeef5;\n}\n.component-notify {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin: 0 20px;\n}\n.component-notify-popover {\n  padding: 0 !important;\n  width: 200px;\n  background: var(--popover-bg);\n  border-radius: 4px;\n  border: var(--popover-border);\n  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);\n}\n.component-notify-header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  border-bottom: 1px solid rgb(197, 197, 197);\n  padding: 10px;\n}\n.component-notify-header-tabs {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.component-notify-header-tabs-tab {\n  background: #f2f3f4;\n  padding: 5px 10px;\n  border-radius: 10px;\n  margin: 0 5px;\n  cursor: pointer;\n}\n.component-notify-header-tabs-active {\n  color: #fff;\n  background: #42b983 !important;\n}\n::v-deep .component-fade-enter-active,\n.component-fade-leave-active {\n  transition: opacity 0.3s ease;\n}\n::v-deep .component-fade-enter,\n.component-fade-leave-to {\n  opacity: 0;\n}\n#arrow,\n#arrow::before {\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  background: inherit;\n}\n\n#arrow {\n  visibility: hidden;\n}\n\n#arrow::before {\n  visibility: visible;\n  content: '';\n  left: 0;\n  border-top: var(--popover-border);\n  border-left: var(--popover-border);\n  transform: rotate(45deg);\n}\n.component-notify-popover[data-popper-placement^='top'] > #arrow {\n  bottom: -4px;\n}\n\n.component-notify-popover[data-popper-placement^='bottom'] > #arrow {\n  top: -4px;\n\n}\n\n.component-notify-popoverp[data-popper-placement^='left'] > #arrow {\n  right: -4px;\n}\n\n.component-notify-popover[data-popper-placement^='right'] > #arrow {\n  left: -4px;\n}";
styleInject(css_248z);

//
var script = {
  data() {
    return {
      prefixCls: "component-notify",
      tableLoading: false,
      isShowNotify: true,
      tabList: [{
        label: "系统消息",
        name: "SystemList"
      }
      // { label: '代办消息', name: 'waitList' }
      ],

      tabActive: "SystemList",
      componentsName: "SystemList",
      notifyLoading: false
    };
  },
  components: {
    List: __vue_component__$1,
    Icon
  },
  mounted() {
    const control = document.querySelector(`.${this.prefixCls}-control`);
    const tooltip = document.querySelector(`.${this.prefixCls}-popover`);
    createPopper(control, tooltip, {
      placement: 'bottom',
      modifiers: [{
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }]
    });
  },
  computed: {
    getMessageList() {
      return {};
    }
  },
  directives: {
    // 是否在dom外
    clickOutside: {
      bind(el, binding, node) {
        el.event = function (event) {
          // 判断当前点击是否非Dom范围
          const popover = document.getElementsByClassName("aochen-notify-popover")[0];
          const detail = document.getElementsByClassName("notify-detail")[0];
          if (el !== event.target && !el.contains(event.target) && popover !== event.target && !popover.contains(event.target)) {
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
      }
    }
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
    moreMessage() {},
    setLoading(flag) {
      this.notifyLoading = flag;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefixCls }, [
    _vm.isShowNotify
      ? _c(
          "div",
          { class: _vm.prefixCls + "-popover", style: { zIndex: 2001 } },
          [
            _c("div", { attrs: { id: "arrow", "data-popper-arrow": "" } }),
            _vm._v(" "),
            _c("div", { class: _vm.prefixCls + "-header" }, [
              _c(
                "div",
                { class: _vm.prefixCls + "-header-tabs" },
                _vm._l(_vm.tabList, function (item) {
                  return _c(
                    "span",
                    {
                      key: item.name,
                      class:
                        _vm.prefixCls +
                        "-header-tabs-tab " +
                        (_vm.componentsName === item.name
                          ? _vm.prefixCls + "-header-tabs-active"
                          : ""),
                      on: {
                        click: function ($event) {
                          return _vm.changeTag(item)
                        },
                      },
                    },
                    [_vm._v(_vm._s(item.label))]
                  )
                }),
                0
              ),
            ]),
            _vm._v(" "),
            _c(
              "transition",
              { attrs: { name: "component-fade", mode: "out-in" } },
              [_c("List", { attrs: { data: _vm.getMessageList } })],
              1
            ),
          ],
          1
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      {
        class: _vm.prefixCls + "-control",
        on: {
          mouseenter: _vm.mouseenterEvent,
          mouseleave: _vm.mouseleaveEvent,
        },
      },
      [
        _c("Icon", {
          attrs: { icon: "mdi:bell-outline", width: "40", height: "40" },
        }),
      ],
      1
    ),
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

function install(app) {
  app.component('VccNotification', __vue_component__);
}
var main = {
  install,
  Notifications: __vue_component__
};

export { main as default, install };
