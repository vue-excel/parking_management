<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item to="/orders">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{$t('orders')}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{$t('testAdmin')}}</v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        {{$i18n.locale}}
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item @click="setLocale('en')">
                        <v-list-item-title>English</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="setLocale('ru')">
                        <v-list-item-title>Русский</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-if="user.isAuth" to="/profile">
                        <v-list-item-title>{{$t('profile')}}</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="user.isAuth" @click="logout()">
                        <v-list-item-title>{{$t('logout')}}</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="!user.isAuth" to="/login">
                        <v-list-item-title>{{$t('login')}}</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="!user.isAuth" to="/register">
                        <v-list-item-title>{{$t('register')}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-content>

        <v-footer app>
            <span>&copy; 2019</span>
        </v-footer>

        <v-snackbar :value="message.snackbar" @input="hideMessage" :color="message.color" :bottom="message.bottom" :right="message.right">
            {{message.text}}
            <v-btn text @click="hideMessage">{{$t('close')}}</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
    import { mapState } from 'vuex';

    export default {

        data: () => ({
            drawer: null,
        }),

        computed: {
            ...mapState({
                user: state => state.user,
                message: state => state.message,
            }),
        },

        methods: {
            logout() {
                this.$store.commit({type: 'LOGOUT_USER'})
                this.$router.push({path: 'login'})
            },
            setLocale(locale) {
                this.$store.commit('UPDATE_SETTINGS_FIELD', { key: 'locale', value: locale })
            },
            hideMessage() {
                this.$store.commit('HIDE_MESSAGE')
            },
        },
    }
</script>

<style>

</style>