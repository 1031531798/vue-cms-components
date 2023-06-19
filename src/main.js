import Notifications from '../package/Notification/index.vue'
import 'animate.css'
export function install (app) {
    app.component('VccNotification', Notifications);
}

export default { install, Notifications }
