import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'

// Bootstrap 
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Routes and Router
const HomePage = import('./components/Home/HomePage.vue');
const RegisterPage = import('./components/Home/RegisterPage.vue');

const ConversationList = import('./components/ConversationList.vue');
const NewConversationPage = import('./components/NewConversationPage.vue');
const ConversationPage = import('./components/ConversationPage.vue');

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/register/', component: RegisterPage, name: 'Register' },
  { path: '/messages/', component: ConversationList, name: 'Messages' },
  { path: '/messages/:conversationId', component: ConversationPage, name: 'Conversation'},
  { path: '/new-message/', component: NewConversationPage, name: 'NewConversation' },
];

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

// Vuex Store
import store from './store'

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
