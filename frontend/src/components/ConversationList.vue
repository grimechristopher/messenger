<template>
  <div>
    <div class="p-2">
      <h1>Conversations</h1>
    </div>
    <div>
      <div v-for="conversation in account.Conversations" :key="conversation.id">
        <RouterLink :to="{ name: 'Conversation', params: { conversationId: conversation.id }}">
          <span>{{ conversation.title }}</span>
          <span>{{ conversationParticipants(conversation.Accounts) }}</span>
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
const account = ref([]);

onMounted (async () => {
  await getConversations();
})

async function getConversations() {
  const response = await fetch("http://localhost:3001/api/conversations/all", {
    credentials: 'include',
    method: "GET",
  });
  account.value = await response.json();
}

async function newConversation() {
  router.push({ name: "NewConversation" });
}

function conversationParticipants(conversationAccounts) {
  let participants = "";
  for (let i = 0; i < conversationAccounts.length; i++) {
    participants += conversationAccounts[i].username;
    if (i < conversationAccounts.length - 1) {
      participants += ", ";
    }
  }
  return participants;
}
</script>