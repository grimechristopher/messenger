<template>
  <div>
    <div>
      <h1>Conversations</h1>
    </div>
    <div>
      <div v-for="conversation in conversations" :key="conversation.id">
        <RouterLink :to="{ name: 'Conversation', params: { conversationId: conversation.id }}">
          {{ conversation.id }}
        </RouterLink>
      </div>
    </div>
    <button @click="newConversation">+</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const conversations = ref([]);

onMounted (async () => {
  await getConversations();
})

async function getConversations() {
  const response = await fetch("http://localhost:3001/api/conversations/all", {
    credentials: 'include',
    method: "GET",
  });
  conversations.value = await response.json();
}

async function newConversation() {
  router.push({ name: "NewConversation" });
}
</script>