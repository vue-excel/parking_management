import axios from 'axios';
import moment from 'moment'
import i18n from '../../i18n'
import _ from 'lodash';

export default {
    state: {
        item: {
            id: null,
            clientName: '',
            clientPhone: '',
            departureAddress: '',
            departureFromDate: '',
            departureFromTime: '',
            departureToDate: '',
            departureToTime: '',
        },

        dialog: false, //display v-dialog

        loading: false,
        errors: {},
    },
    actions: {
        loadOrder ({commit}, payload) {
            axios
                .get(this.state.API_URL+'orders/'+payload.id)
                .then( (response) => {
                    if (payload.mode == 'clone') {
                        response.data.order_data.id = null
                    }
                    commit('LOAD_ORDER', response.data)
                })
                .catch((error) => {
                    //console.log(error)
                    commit('SHOW_MESSAGE', {text: error, 'color': 'error'})
                });
        },
        deleteOrder ({commit}, payload) {
            axios
                .delete(this.state.API_URL+'orders/'+payload.id)
                .then( (response) => {
                    if (response.data.status == 'success') {
                        commit('SHOW_MESSAGE', {text: i18n.t('orderWithIdDeleted', {'id': payload.id}), 'color': 'success'})
                    }

                    this.dispatch({'type': 'loadOrders'})
                })
                .catch((error) => {
                    //console.log(error)
                    commit('SHOW_MESSAGE', {text: error, 'color': 'error'})
                });
        },
        saveOrder ({commit}, payload) {

            commit({type: 'SET_ORDER_LOADING_STATE', value: true})

            let form_data = new FormData()
            for ( let key in this.state.order.item ) {
                let value = this.state.order.item[key]
                form_data.append(key, value);
            }

            let method
            let url

            if (this.state.order.item.id) {
                method = 'PATCH'
                url = this.state.API_URL+'orders/'+this.state.order.item.id
            }
            else {
                method = 'POST'
                url = this.state.API_URL+'orders'
            }

            axios({ method, url, data:form_data })
                .then( (response) => {

                    commit('SAVE_ORDER', response.data)

                    if (response.data.status == 'success') {
                        let text = this.state.order.item.id
                            ? i18n.t('orderWithIdSuccessfullyEdited', {'id': this.state.order.item.id})
                            : i18n.t('orderCreatedSuccessfully')

                        commit('SHOW_MESSAGE', {text: text, 'color': 'success'})
                        //update orders list
                        this.dispatch({'type': 'loadOrders'})
                    }
                })
                .catch((error) => {
                    //console.log(error)
                    commit('SHOW_MESSAGE', {text: error, 'color': 'error'})
                })
                .finally(() => {
                    commit({type: 'SET_ORDER_LOADING_STATE', value: false})
                })
        },

    },
    mutations: {
        //updating field value
        UPDATE_ORDER_FIELD(state, payload) {
            state.item[payload.key] = payload.value
        },

        //load existing
        LOAD_ORDER(state, payload) {
            state.item.id = payload.order_data.id
            state.item.clientName = payload.order_data.clientName
            state.item.clientPhone = payload.order_data.clientPhone
            state.item.departureAddress = payload.order_data.departureAddress
            state.item.departureFromDate = moment.unix(payload.order_data.departureFrom).format("YYYY-MM-DD")
            state.item.departureFromTime = moment.unix(payload.order_data.departureFrom).format("HH:mm")
            state.item.departureToDate = moment.unix(payload.order_data.departureTo).format("YYYY-MM-DD")
            state.item.departureToTime = moment.unix(payload.order_data.departureTo).format("HH:mm")

            //state.loading = false
        },

        //create new
        ADD_ORDER(state, payload) {
            state.errors = {}

            state.item.id = null
            state.item.clientName = ''
            state.item.clientPhone = ''
            state.item.departureAddress = ''
            state.item.departureFromDate = ''
            state.item.departureFromTime = ''
            state.item.departureToDate = ''
            state.item.departureToTime = ''
        },

        SET_ORDER_LOADING_STATE(state, payload) {
            state.loading = payload.value
        },

        SAVE_ORDER(state, payload) {
            if (_.isEmpty(payload.errors)) {
                state.errors = {}
            }
            else {
                state.errors = payload.errors
            }
        },

        SHOW_ORDER_DIALOG(state, payload) {
            state.dialog = true
        },

        HIDE_ORDER_DIALOG(state, payload) {
            state.dialog = false
        },

        CLEAR_ORDER_ERRORS(state, payload) {
            state.errors = {}
        },
    },
}