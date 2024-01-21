<template>
  <div class="home-container">
    <div class="header-container">
      <h1>Welcome To My Messenger</h1>
      <p class="lead">Sign in to start messaging</p>
    </div>
    <div class="login-container"> 
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 1.67rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.header-container {
  text-align: center;
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh; */
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>