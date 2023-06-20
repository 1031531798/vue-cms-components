import Notifications from "../package/Notification/index.vue";
import "animate.css";
export function install(app) {
  app.component("VccNotification", VccNotifications);
}

export const VccNotifications = Notifications
export default { install };
