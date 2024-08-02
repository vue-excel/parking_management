<template>
    <div>
        <v-form @submit.prevent="register">

            <v-text-field
                    v-model="name"
                    label="Имя"
                    required
                    :rules="nameRules"
                    :error-messages="errors.name"
            ></v-text-field>

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

            <v-text-field
                    v-model="password2"
                    label="Пароль еще раз"
                    type="password"
                    required
                    :rules="passwordRules"
                    :error-messages="errors.password2"
            ></v-text-field>

            <v-btn type="submit" color="primary" :disabled="loading" :loading="loading">{{$t('register')}}</v-btn>

        </v-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "RegisterForm",

        data() {
            return {
                name: 'Николай',
                email: 'disasterovich@mail.ru', //null,
                password: 'zstebgtu', //null,
                password2: 'zstebgtu', //null,

                nameRules: [
                    v => !!v || 'Name is required',
                ],

                passwordRules: [
                    v => !!v || 'Password is required',
                    //v => v.length <= 10 || 'Name must be less than 10 characters',
                ],

                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],

                //TODO add captcha
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
            register() {

                //TODO add client side validation

                this.$store.dispatch({'type': 'registerUser',
                    'name': this.name,
                    'email': this.email,
                    'password': this.password,
                    'password2': this.password2,
                })
            }
        }

    }
</script>

<style scoped>

</style>