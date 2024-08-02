<template>
    <div class="login">
        <h1>{{$t('profile')}}</h1>
        <v-container>
            <v-row>
                <v-col cols="12" sm="4" offset-sm="2">
                    name
                </v-col>
                <v-col cols="12" sm="4">
                    {{user.name}}
                </v-col>

                <v-col cols="12" sm="4" offset-sm="2">
                    email
                </v-col>
                <v-col cols="12" sm="4">
                    {{user.email}}
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        components: {

        },

        computed: {
            ...mapState({
                user: state => state.user.item,
            }),
        },
    }
</script>

<style>

</style>