import Notifications from "../package/Notification/index.vue";
import IconButton from "../package/IconButton/index.vue";
import "animate.css";
import './styles/common.css'
import { loadScript } from "./utils/util.js";

export function install(app) {
  app.component("VccNotifications", VccNotifications);
  app.component("VccIconButton", VccIconButton);
}

// 引入iconfont
loadScript('/public/iconfont/iconfont.js')

export const VccNotifications = Notifications
export const VccIconButton = IconButton
export default { install };
