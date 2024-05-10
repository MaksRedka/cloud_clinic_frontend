/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from './plugins'
import router from "./router";
import { appStore } from "./store/app"


const app = createApp(App)

registerPlugins(app)
app.mount('#app')

const store= appStore()
router.beforeEach((to, from, next) => {
    if (store.getIsAuthenticated) {
      switch (to.path) {
        case '/card':
          store.setPage('card');
          break;
        case '/chats':
          store.setPage('chats');
          break;
        case '/plans':
          store.setPage('plans');
          break;
        case '/notifications':
          store.setPage('notifications');
          break;
        default:
          store.setPage('');
          break;
      }
      next();
    }
    else {
      if (to.path === '/') {
        next();
      }
      else next('/');
    }
})
