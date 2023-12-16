<template>
  <div class="main-wrapper">
    <div class="application-wrapper">
      <DefaultHeader 
        
      />
      <router-view></router-view>
      <DefaultFooter />

    </div>
  </div>
</template>

<script setup>
// import DefaultHeader from '@/components/Layout/DefaultHeader.vue'
// import DefaultFooter from '@/components/Layout/DefaultFooter.vue'



// export default {
//   name: 'App',
//   components: {
//     // HelloWorld
//   }
// }
</script>

<style>
.main-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.application-wrapper {
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
