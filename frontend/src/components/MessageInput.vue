<template>
  <div>
    <input type="text" class="form-control" v-model="message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const message = ref('');

const route = useRoute();
const conversationId = route.params.conversationId;

async function sendMessage() {
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