<template>
  <div class="input-group mb-1">
    <input type="text" class="form-control" v-model="message" />
    <button class="btn btn-outline-primary" @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const message = ref('');

const route = useRoute();
const conversationId = route.params.conversationId;

async function sendMessage() {
  if (!message.value) {
    return;
  }

  await fetch("http://localhost:3001/api/messages/create/", {
    credentials: 'include',
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      conversationId: conversationId,
      message: message.value,
    }),
  });

  message.value = '';
}

</script>