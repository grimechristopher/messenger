<template>
  <div class="card mb-1" :class="{'own-message text-white bg-primary': isOwnMessage(message.Account.id), }">
    <div class="card-body p-2">
      <div v-if="isGroupMessage() && !isOwnMessage(message.Account.id)">
        <span class="fw-bold">{{ message.Account.username }}</span>
      </div>
      <div class="card-text"><span>{{ message.content }}</span></div>
      <div v-if="showTime" class="message-time">
        <span class="small">{{ formatDate(message.createdAt)}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  message: Object,
  conversation: Object,
  showTime: Boolean,
})

console.log(props.conversation)

function isOwnMessage(accountId) {
  return accountId === store.state.auth.user.userId;
}

function isGroupMessage() {
  console.log(props.conversation)
  if (!props.conversation) {
    return false;
  }
  if (props.conversation.Accounts && props.conversation.Accounts.length > 1) {
    return true;
  }
  return false
  // return props.conversation.Accounts.length > 2;
}

function formatDate(date) {
  const dateObject = new Date(date);
  return dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric',  })
}

</script>

<style scoped>
.card {
  min-width: 0;
  max-width: 80%;
  align-self: flex-start;
}
.card > div {
  min-width: none;
}
.own-message {
  align-self: flex-end;
  text-align: right;
}
</style>