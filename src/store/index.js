import { createStore } from 'vuex'
import notification from "./module/notification.js";
import getters from "./getters.js";
const store = createStore({
  modules: {
    notification
  },
  getters
})

export default store
