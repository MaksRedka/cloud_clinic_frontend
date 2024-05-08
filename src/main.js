import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL // Your API base URL
});

const app = createApp(App);

// Mount the router
app.use(router);

app.config.globalProperties.$axios = axiosInstance;
app.mount('#app');