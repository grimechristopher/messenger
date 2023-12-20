<template>
  <div>
    <h1>Conversation</h1>
    <div>
      <!-- Put the messages here-->
      {{ messages }}
    </div>
    <div>
      <MessageInput />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'

import MessageInput from './MessageInput.vue';

const route = useRoute();
const conversationId = route.params.conversationId;
const messages = ref([]);

onMounted( async () => {
  console.log('conversation page created')
  const response = await fetch("http://localhost:3001/api/messages/all?" + new URLSearchParams({
    conversationId: conversationId,
  }), {
    credentials: 'include',
    method: "GET",
  });

  messages.value = await response.json();
})

</script>
