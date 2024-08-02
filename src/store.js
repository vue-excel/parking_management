import Vue from 'vue'
import Vuex from 'vuex'
import OrdersModule from './store/modules/orders'
import OrderModule from './store/modules/order'
import UserModule from './store/modules/user'
import SettingsModule from './store/modules/settings'
import MessageModule from './store/modules/message'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        HOST: 'http://BACKEND_HOST_HERE/',
        API_URL: 'http://BACKEND_HOST_HERE/api/',
    },
    modules: {
        orders: OrdersModule,
        order: OrderModule,
        user: UserModule,
        settings: SettingsModule,
        message: MessageModule,
    },
    strict: process.env.NODE_ENV !== 'production',
})
