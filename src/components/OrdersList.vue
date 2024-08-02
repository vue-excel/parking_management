<template>
    <div>
        <div v-if="orders.length > 0">
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">
                        <a href="#" @click.prevent="setSort('id')">ID<v-icon>{{getSortIcon('id')}}</v-icon></a>
                    </th>
                    <th class="text-left">{{$t('creationTime')}}</th>
                    <th class="text-left">
                        <a href="#" @click.prevent="setSort('client_name')">{{$t('name')}}<v-icon>{{getSortIcon('client_name')}}</v-icon></a>
                    </th>
                    <th class="text-left">{{$t('phone')}}</th>
                    <th class="text-left">{{$t('address')}}</th>
                    <th class="text-left">{{$t('from')}}</th>
                    <th class="text-left">{{$t('to')}}</th>
                    <th class="text-left">{{$t('actions')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ timestampToDate(order.created_at) }}</td>
                    <td>{{ order.client_name }}</td>
                    <td>{{ order.client_phone }}</td>
                    <td>{{ order.departure_address }}</td>
                    <td>{{ timestampToDate(order.departure_from) }}</td>
                    <td>{{ timestampToDate(order.departure_to) }}</td>
                    <td>
                        <a href="#" @click.stop="cloneOrder(order.id)" :title="$t('clone')">
                            <v-icon>mdi-content-copy</v-icon>
                        </a>
                        <a href="#" @click.stop="loadOrder(order.id)" :title="$t('edit')">
                            <v-icon>mdi-pencil</v-icon>
                        </a>
                        <a href="#" @click.stop="deleteOrder(order.id)" :title="$t('delete')">
                            <v-icon>mdi-delete</v-icon>
                        </a>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>

            <v-row>
                <v-col cols="12">
                    <v-pagination
                        :length="pagination['page-count']"
                        :total-visible="5"
                        :value="pagination['current-page']"
                        @input="getOrders"
                    ></v-pagination>
                </v-col>
            </v-row>
        </div>
        <div v-else>{{$t('noOrders')}}</div>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapState, mapGetters } from 'vuex';

    export default {
        name: "OrdersList",
        components: {

        },
        computed: {
            ...mapState({
                orders: state => state.orders.items,
                pages: state => state.orders.pages,
                pagination: state => state.orders.pagination,
                sort: state => state.orders.sort,
            }),

            ...mapGetters({
                ordersSortString: 'ordersSortString',
            })
        },

        created() {
            //выводим список заказов
            this.getOrders(1)
        },

        methods: {

            timestampToDate(timestamp, format="YYYY-MM-DD HH:mm") {
                return moment.unix(timestamp).format(format)
            },

            setSort(field_name) {
                this.$store.commit({type: 'SET_ORDERS_SORT',value: field_name})
                this.$store.dispatch({'type': 'loadOrders'}) //TODO загружать тек. страницу
            },

            getSortIcon(field_name) {
                if ( this.sort[field_name] == 'asc' ) {
                    return 'mdi-chevron-down'
                }
                else if ( this.sort[field_name] == 'desc' ) {
                    return 'mdi-chevron-up'
                }
                return ''
            },

            getOrders(page) {
                this.$store.dispatch({'type': 'loadOrders','page': page})
            },

            loadOrder(id) {
                this.$store.commit('CLEAR_ORDER_ERRORS')
                this.$store.dispatch({'type': 'loadOrder', 'id': id})
                this.$store.commit('SHOW_ORDER_DIALOG')
            },

            deleteOrder(id) {
                if (confirm(this.$t('areYouSureWantDelete'))) {
                    this.$store.dispatch({'type': 'deleteOrder', 'id': id})
                }
            },

            cloneOrder(id) {
                this.$store.commit('CLEAR_ORDER_ERRORS')
                this.$store.dispatch({'type': 'loadOrder', 'id': id, 'mode': 'clone'})
                this.$store.commit('SHOW_ORDER_DIALOG')
            },
        }
    }
</script>

<style scoped>

</style>