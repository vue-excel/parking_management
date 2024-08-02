import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

const router = new Router({

    mode: 'history',

  routes: [
      {
          path: '/',
          name: 'home',
          component: () => import("./views/Home"),
      },
      {
          path: '/orders',
          name: 'orders',
          component: () => import("./views/Orders"),
          meta: { onlyAuth: true }
      },
      {
          path: '/login',
          name: 'login',
          component: () => import("./views/Login"),
          meta: { onlyGuest: true },
      },
      {
          path: '/register',
          name: 'register',
          component: () => import("./views/Register"),
          meta: { onlyGuest: true }
      },
      {
          path: '/profile',
          name: 'profile',
          component: () => import("./views/Profile"),
      },
  ],
})

router.beforeEach((to, from, next) => {

        //init user data
        store.commit('INIT_USER')

        //init settings
        store.commit('INIT_SETTINGS')

        //init orders (sort)
        store.commit('INIT_ORDERS')

        if (to.matched.some(record => record.meta.onlyAuth)) {
            if (store.state.user.isAuth) {
                return next()
            }

            return next({name: 'login'})
        }

        if (to.matched.some(record => record.meta.onlyGuest)) {
            if (store.state.user.isAuth) {
                return next({name: 'home'})
            }

            return next()
        }

        next()
    }
)

export default router