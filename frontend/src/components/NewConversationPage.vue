<template>
  <div>New Conversation</div>
  <div>
    <div v-for="account in selectedAccounts" :key="account.id">
      <button @click="deselectAccount(account)">{{ account.username }}</button>
    </div>
    <div>
      <button @click="createConversation">Create Conversation</button>
    </div>
  </div>
  <input type="text" class="form-control" v-model="searchString" @input="searchAccounts" />
  <div v-for="option in accountOptions" :key="option.id">
    <button  :value="option.id" @click="selectAccount(option)" :disabled="option.isSelected">{{ option.username }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { debounce } from './Utils/debounce.js';

const searchString = ref('');
let accountOptions = ref([]);
let selectedAccounts = ref([]);

const searchAccounts = debounce( async () => {
    if (searchString.value.length < 3) {
      accountOptions.value = [];
      return;
    }
  
    const response = await fetch("http://localhost:3001/api/accounts/search/?" + new URLSearchParams({
      searchString: searchString.value,
    }), {
      credentials: 'include',
      method: "GET",
    });
    
    accountOptions.value = await response.json();
  })

function selectAccount(option) {
  option.isSelected = true; 
  selectedAccounts.value.push(option);
}

function deselectAccount(selected) {
  let accountOptionsIndex = accountOptions.value.findIndex(account => account.id === selected.id);
  let selectedAccountsIndex = selectedAccounts.value.findIndex(account => account.id === selected.id);

  selectedAccounts.value.splice(selectedAccountsIndex, 1);
  accountOptions.value[accountOptionsIndex].isSelected = false;
}

function createConversation() {
  console.log(selectedAccounts.value);
}

</script>