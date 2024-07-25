import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({

    mode: 'history',

  routes: [

      {
          path: '/login',
          name: 'login',
          component: () => import("./views/Login"),
          meta: { onlyGuest: true },
      },
    
  ],
})

export default router