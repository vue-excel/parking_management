<template>
  <div class="register">

    <h1>{{$t('register')}}</h1>

    <div class="row">
        <div class="offset-3 col-6">
            <register-form></register-form>
        </div>
    </div>

  </div>
</template>

<script>

import RegisterForm from "@/components/RegisterForm";

export default {
    components: {
        RegisterForm,
    }
}
</script>
