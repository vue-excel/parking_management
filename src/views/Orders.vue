<template>

    <v-container>
        <v-row>
            <v-col cols="12" sm="6">
                <orders-search></orders-search>
            </v-col>
            <v-col cols="12" sm="6" class="text-right">
                <order></order>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <orders-list></orders-list>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import OrdersList from '@/components/OrdersList'
    import OrdersSearch from '@/components/OrdersSearch'
    import Order from '@/components/Order'

    export default {
        components: {
            OrdersSearch,
            OrdersList,
            Order,
        }
    }
</script>

<style>

</style>