export default {
    state: {
        snackbar: false,

        color: 'success', //'success', 'info', 'error'
        text: '',
        timeout: 6000,
        left: false,
        bottom: true,
        top: false,
        right: true,
    },

    mutations: {

        SHOW_MESSAGE(state, payload) {
            state.color = payload.color
            state.text = payload.text
            state.snackbar = true
        },

        HIDE_MESSAGE(state, payload) {
            state.snackbar = false
        },
    },
}