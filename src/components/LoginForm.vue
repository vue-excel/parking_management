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