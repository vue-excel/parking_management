import axios from "axios";
import router from '../../router';
import i18n from "../../i18n";

export default {
    state: {
        item: {
            id: null,
            email: '',
            name: '-',
            token: '',
        },
        isAuth: false,

        loading: false,
        errors: [],
    },

    actions: {

        loginUser({commit}, payload) {

            commit({type: 'SET_USER_LOADING_STATE', value: true})

            axios
                .post(this.state.API_URL+'users/login', {
                    email: payload['email'],
                    password: payload['password'],
                })
                .then( (response) => {
                    commit('LOGIN_USER', response.data)

                    if (response.data.status == 'success') {
                        //redirect to orders
                        router.push({path: 'orders'})
                    }
                })
                .catch((error) => {
                    //console.log(error)
                    commit('SHOW_MESSAGE', {text: error, 'color': 'error'})
                })
                .finally(() => {
                    commit({type: 'SET_USER_LOADING_STATE', value: false})
                })
        },

        registerUser({commit}, payload) {

            commit({type: 'SET_USER_LOADING_STATE', value: true})

            axios
                .post(this.state.API_URL+'users/register', {
                    name: payload['name'],
                    email: payload['email'],
                    password: payload['password'],
                    password2: payload['password2'],
                })
                .then((response) => {
                    commit('REGISTER_USER', response.data)

                    if (response.data.status == 'success') {
                         commit('SHOW_MESSAGE', {text: i18n.t('registrationCompletedSuccessfully'), 'color': 'success'})
                        //redirect to login page
                        router.push({path: 'login'})
                    }
                })
                .catch((error) => {
                    //console.log(error)
                    commit('SHOW_MESSAGE', {text: error, 'color': 'error'})
                })
                .finally(() => {
                    commit({type: 'SET_USER_LOADING_STATE', value: false})
                })
        },
    },
    mutations: {

        LOGIN_USER(state, payload) {

            if (payload.errors) {
                state.errors = payload.errors
            }

            if (payload.status == 'success') {
                state.item = payload.user_data
                state.errors = []
                state.isAuth = true
                //saving in localStorage
                localStorage.setItem('user', JSON.stringify(state.item));
                axios.defaults.headers.common['Authorization'] = 'Bearer '+state.item.token;
            }
        },

        LOGOUT_USER(state) {
            state.item = null
            state.isAuth = false
            localStorage.removeItem('user')
        },

        //init. user data
        INIT_USER(state) {
            if (state.isAuth === false) {

                let user = JSON.parse(localStorage.getItem('user'))

                if (user) {
                    state.item = user
                    state.isAuth = true
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
                }
            }
        },

        //user registration
        REGISTER_USER(state, payload) {
            if (payload.errors) {
                state.errors = payload.errors
            }
        },

        SET_USER_LOADING_STATE(state, payload) {
            state.loading = payload.value
        },
    },
}