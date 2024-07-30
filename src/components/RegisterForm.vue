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



<style scoped>

</style>