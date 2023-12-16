<template>
  <div>New Conversation</div>
  <div>
    <div v-for="account in selectedAccounts" :key="account.id">
      <button>{{ account.username }}</button>
    </div>
  </div>
  <input type="text" class="form-control" v-model="searchString" @input="searchAccounts()" />
  <div v-for="option in accountOptions" :key="option.id">
    <button  :value="option.id" @click="selectAccount(option)" :disabled="option.isSelected">{{ option.username }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchString = ref('');
let accountOptions = ref([]);
let selectedAccounts = ref([]);


async function searchAccounts() {
  console.log(searchString.value);
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
  
  accountOptions = await response.json();
  console.log(accountOptions)
}

function selectAccount(option) {
  option.isSelected = true; 
  selectedAccounts.value.push(option);
}

</script>