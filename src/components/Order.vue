<template>
    <div>
        <v-btn color="primary" @click.stop="addOrder()">{{$t('createOrder')}}</v-btn>

        <v-dialog :value="dialog" @input="hideOrderDialog" max-width="600">
            <v-card>
                <v-card-title class="headline">
                    {{order.id ? $t('editOrderWithId') + order.id : $t('createOrder')}}
                </v-card-title>

                <v-card-text>

                    <v-text-field
                        :value="order.clientName"
                        @input="value => updateOrderField('clientName',value)"
                        :label="$t('clientName')+'*'"
                        required
                        :error-messages="errors.clientName"
                    ></v-text-field>

                    <v-text-field
                        :value="order.clientPhone"
                        @input="value => updateOrderField('clientPhone',value)"
                        type="tel"
                        :label="$t('clientPhone')+'*'"
                        required
                        :error-messages="errors.clientPhone"
                    ></v-text-field>

                    <v-text-field
                        :value="order.departureAddress"
                        @input="value => updateOrderField('departureAddress',value)"
                        :label="$t('departureAddress')+'*'"
                        required
                        :error-messages="errors.departureAddress"
                    ></v-text-field>

                    <v-menu
                        v-model="menuDepartureFromDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                :label="$t('departureFromDate')+'*'"
                                readonly
                                v-on="on"
                                :value="order.departureFromDate"
                                :error-messages="errors.departureFromDate"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            @input="value => updateOrderField('departureFromDate',value)"
                            :value="order.departureFromDate"
                            :first-day-of-week="1"
                            :locale="$i18n.locale"
                        >
                        </v-date-picker>
                    </v-menu>

                    <v-text-field
                        :label="$t('departureFromTime')+'*'"
                        type="time"
                        :value="order.departureFromTime"
                        @input="value => updateOrderField('departureFromTime',value)"
                        :error-messages="errors.departureFromTime"
                    ></v-text-field>

                    <v-menu
                        v-model="menuDepartureToDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                :label="$t('departureToDate')+'*'"
                                readonly
                                v-on="on"
                                :value="order.departureToDate"
                                :error-messages="errors.departureToDate"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            @input="value => updateOrderField('departureToDate',value)"
                            :value="order.departureToDate"
                            :first-day-of-week="1"
                            :locale="$i18n.locale"
                        >
                        </v-date-picker>
                    </v-menu>

                    <v-text-field
                        :label="$t('departureToTime')+'*'"
                        type="time"
                        :value="order.departureToTime"
                        @input="value => updateOrderField('departureToTime',value)"
                        :error-messages="errors.departureToTime"
                    ></v-text-field>

                    <input type="hidden" :value="order.id" />

                    <small>*{{$t('indicatesRequiredField')}}</small>

                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="hideOrderDialog">{{$t('close')}}</v-btn>
                    <v-btn color="blue darken-1" text @click="saveOrder" :disabled="loading" :loading="loading">{{order.id ? $t('update') : $t('save')}}</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import _ from 'lodash';

    export default {
        name: "Order",

        data() {
            return {
                menuDepartureFromDate: '',
                menuDepartureToDate: '',
            }
        },

        computed: {
            ...mapState({
                order: state => state.order.item,
                loading: state => state.order.loading,
                errors: state => state.order.errors,
                dialog: state => state.order.dialog,
            }),
        },

        mounted() {

            //Обработчик вызывается после каждой мутации и получает в качестве параметров дескриптор мутации и состояние после мутации
            this.$store.subscribe((mutation, state) => {

                switch (mutation.type) {

                    case 'SAVE_ORDER':
                        //after saving, close the window
                        if (_.isEmpty(this.errors)) {
                            this.$store.commit('HIDE_ORDER_DIALOG')
                        }
                        break;
                }
            })
        },

        methods: {

            hideOrderDialog() {
                this.$store.commit('HIDE_ORDER_DIALOG')
            },

            updateOrderField(key,value) {

                //close the date selection menu
                if (key === 'departureFromDate') {
                    this.menuDepartureFromDate = false
                }
                //close the date selection menu
                else if (key === 'departureToDate') {
                    this.menuDepartureToDate = false
                }

                this.$store.commit('UPDATE_ORDER_FIELD', { key: key, value: value })
            },
            saveOrder() {
                this.$store.dispatch({'type': 'saveOrder'})
            },
            addOrder() {
                this.$store.commit('SHOW_ORDER_DIALOG')
                this.$store.commit('ADD_ORDER')
            },
        }
    }
</script>

<style>

</style>