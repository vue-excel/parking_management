<template>
    <div>
        <v-form @submit.prevent="login" v-model="valid">

            <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                    :rules="emailRules"
                    :error-messages="errors.email"
            ></v-text-field>

            <v-text-field
                    v-model="password"
                    label="Пароль"
                    type="password"
                    required
                    :rules="passwordRules"
                    :error-messages="errors.password"
            ></v-text-field>

            <v-btn type="submit" color="primary" :disabled="loading" :loading="loading">{{$t('login')}}</v-btn>

        </v-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "LoginForm",

        data() {
            return {
                valid: false,

                email: 'disasterovich@mail.ru',
                password: 'zstebgtu',

                passwordRules: [
                    v => !!v || 'Password is required',
                    
                ],

                emailRules: [
                    v => !!v || 'E-mail is required',
                    
                ],
            }
        },

        computed: {
            ...mapState({
                errors: state => state.user.errors,
                loading: state => state.user.loading,
                user: state => state.user.item,
            }),
        },

        methods: {
            login() {
                this.$store.dispatch({'type': 'loginUser',
                    'email': this.email,
                    'password': this.password})
            }
        }

    }
</script>

<style scoped>

</style>