import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'

// Bootstrap 
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Routes and Router
const HomePage = import('./components/Home/HomePage.vue');
const MessagesPage = import('./components/MessagesPage.vue');
const NewConversationPage = import('./components/NewConversationPage.vue');

const routes = [
  { path: '/', component: HomePage },
  { path: '/messages/', component: MessagesPage, name: 'Messages' },
  { path: '/new-message/', component: NewConversationPage, name: 'NewConversation' },
];

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

// Vuex Store
import store from './store'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
