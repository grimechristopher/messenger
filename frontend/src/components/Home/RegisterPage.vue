<template>
  <LoginLayout>
      <RegisterForm
      />
  </LoginLayout>
</template>
<script setup>
import LoginLayout from '../LoginLayout.vue';
import RegisterForm from './RegisterForm.vue';

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>