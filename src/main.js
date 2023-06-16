import Notifications from '../package/Notification/index.vue'
export function install (app) {
    app.component('VccNotification', Notifications);
}

export default { install, Notifications }
