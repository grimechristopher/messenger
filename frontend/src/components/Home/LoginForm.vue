<template>
  <div>
    <form @submit.prevent="signIn()" class="mb-3">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="text" id="email" name="email" class="form-control" v-model="email" />
      </div> 
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" name="password" class="form-control" v-model="password" />
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary mb-3 form-control">Sign In</button>
      </div>
    </form>
    <p>New here? <RouterLink to="register">Register</RouterLink></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function signIn() {
  const response = await fetch("http://localhost:3001/api/auth/signin", {
    credentials: 'include', // Don't forget to include this in your requests. ALL OF THEM
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  
  if (response.status === 200) {
    let user = await response.json();
    if (user.isLoggedIn) {
      await store.dispatch("signIn", user);
      if (store.state.auth.user.isLoggedIn) {
        router.push({ name: "Messages" });
      }
    }
  }
  else {
    errorMessage.value = await response.text()
  }
}
</script>