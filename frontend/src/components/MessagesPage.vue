<template>
  <div>
    Messages
    <button @click="testPrivate">Test Private</button>
    <button @click="newConversation">+</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

async function testPrivate() {
  const response = await fetch("http://localhost:3001/api/auth/test-private", {
    credentials: 'include',
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify({
    //   email: email.value,
    //   password: password.value,
    // }),
  });
  console.log(response)
}

async function newConversation() {
  router.push({ name: "NewConversation" });
}
</script>