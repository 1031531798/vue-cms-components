import Notifications from "../package/Notification/index.vue";
import IconButton from "../package/IconButton/index.vue";
import FileUploader from "../package/FileUploader/index.vue";
import "animate.css";
import './styles/common.css'
import '../public/iconfont/iconfont.js'
// import { openPreview } from "../package/Preview/index.js";
export function install(app) {
  app.component(VccNotifications.name, VccNotifications);
  app.component(VccIconButton.name, VccIconButton);
  app.component(VccFileUploader.name, VccFileUploader);
  // openPreview()
}

export const VccNotifications = Notifications
export const VccIconButton = IconButton
export const VccFileUploader = FileUploader
export default { install };
