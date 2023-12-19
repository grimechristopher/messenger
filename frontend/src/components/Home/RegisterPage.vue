<template>
  <div class="login-container">
      <RegisterForm
      />
  </div>
</template>
<script setup>

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