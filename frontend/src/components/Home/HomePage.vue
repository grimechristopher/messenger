<template>
  <LoginLayout>
    {{ isConnected }}
    <LoginForm
    />
  </LoginLayout>
</template>
<script setup>
import LoginLayout from '../LoginLayout.vue'; 
import LoginForm from './LoginForm.vue';
import { ref } from "vue";
import { state, socket } from "@/socket";


const isConnected = ref(false);
isConnected.value = state.connected;
socket.emit("hello", "world");
socket.emit("world", "hello");

</script>

<style scoped>
.home-container {
  padding: 1.67rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.header-container {
  text-align: center;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>