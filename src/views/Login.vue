<template>
  <div class="login">

    <h1>{{$t('login')}}</h1>

    <div class="row">
        <div class="offset-3 col-6">
            <login-form></login-form>
        </div>
    </div>

  </div>
</template>

<script>

import LoginForm from '@/components/LoginForm'

export default {
    components: {
        LoginForm
    }
}
</script>
