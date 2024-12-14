import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Importando estilos do Tailwind
import './style.css'

// Store
const store = createStore({
  state() {
    return {
      currentPrayer: 0,
      prayerMode: 'terco'
    }
  },
  mutations: {
    nextPrayer(state) {
      state.currentPrayer++
    },
    resetPrayer(state) {
      state.currentPrayer = 0
    },
    setPrayer(state, value) {
      state.currentPrayer = value
    },
    setPrayerMode(state, mode) {
      state.prayerMode = mode
    }
  }
})

// Router
const router = createRouter({
  history: createWebHistory('/rosario/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/pray',
      name: 'pray',
      component: () => import('./views/Pray.vue')
    }
  ]
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
