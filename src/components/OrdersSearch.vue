<template>
    <div>
        <v-text-field
            :value="search.clientName"
            @input="value => updateOrdersSearchField('clientName', value)"
            :placeholder="$t('searchByClientName')">
        </v-text-field>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import _ from 'lodash';

    export default {
        name: "OrdersSearch",

        computed: {
            ...mapState({
                search: state => state.orders.search,
            }),
        },

        methods: {
            updateOrdersSearchField:
                _.debounce(function (key, value) {
                    this.$store.commit('UPDATE_ORDERS_SEARCH_FIELD', { key: key, value: value })
                    this.$store.dispatch({'type': 'loadOrders'})
                }, 1000)
        }
    }
</script>

<style scoped>

</style>