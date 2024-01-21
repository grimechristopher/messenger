<template>
  <div class="conversation-page">
    <div class="page-header p-2">
      <button class="btn p-0 me-2 pb-2">
          <RouterLink :to="{ name: 'Messages' }">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </RouterLink>
      </button>
      <h1 class="text-truncate"><span v-for="account in conversation.Accounts" :key="account.id">{{ account.username }}</span></h1>
    </div>
    <div class="messages-container px-2 mb-2" ref="messagesContainer">
      <!-- Put the messages here-->
        <MessageBubble 
        v-for="(message, index) in messages" :key="message.id" 
          :message="message"
          :conversation="conversation"
          :showTime="showTime(message, index)"
        />
    </div>
    <div class="message-input">
      <MessageInput />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router'

import MessageInput from './MessageInput.vue';
import MessageBubble from './MessageBubble.vue';

const route = useRoute();
const conversationId = route.params.conversationId;
const messages = ref([]);
const conversation = ref({});

const messagesContainer = ref(null);

onMounted( async () => {
  console.log('conversation page created')
  const response = await fetch("http://localhost:3001/api/messages/all?" + new URLSearchParams({
    conversationId: conversationId,
  }), {
    credentials: 'include',
    method: "GET",
  });

  const conversationResponse = await fetch("http://localhost:3001/api/conversations/" + conversationId, {
    credentials: 'include',
    method: "GET",
  });

  messages.value = await response.json();
  conversation.value = await conversationResponse.json();

  await nextTick();
  scrollMessagesToBottom();

  console.log(conversation.value)
})

function scrollMessagesToBottom() {
  messagesContainer.value.scrollTop  = messagesContainer.value.scrollHeight;
}

function showTime(message, index) {
  let nextMessage = messages.value[index+1];
  console.log(nextMessage)
  console.log("WTF")
  if (nextMessage && isSameMinute(message, nextMessage) && isSameSender(message, nextMessage)) {
    return false;
  }
  console.log('NOT same minute')
  // if (messages[index+1] && messages[index+1].createdAt) {
  //   return false;
  // }
  return true;
}
 
function isSameMinute(message, nextMessage) {
  const messageDate = new Date(message.createdAt);
  const nextMessageDate = new Date(nextMessage.createdAt);
  console.log(messageDate.getMinutes(), nextMessageDate.getMinutes())
  return messageDate.getMinutes() === nextMessageDate.getMinutes();
}

function isSameSender(message, nextMessage) {
  return message.Account.id === nextMessage.Account.id;
} 

</script>

<style scoped>
.conversation-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  max-height: 100vh;
}
.page-header, .message-input {
  flex: 0 1 0;
  display: flex;
  /* align-items: center; */
}
.messages-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  /* justify-content: flex-end; */
}

</style>